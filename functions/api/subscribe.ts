interface Env {
  RESEND_API_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const origin = context.request.headers.get("Origin") || "";
  const corsHeaders = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  const formData = await context.request.formData();
  const email = formData.get("email");

  if (!email || typeof email !== "string") {
    return new Response(JSON.stringify({ error: "Email is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  // Basic email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: "Invalid email address" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Denver For All <info@denverforall.org>",
        to: [email],
        subject: "Welcome to Denver For All",
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 2rem;">
            <h1 style="font-size: 1.5rem; color: #1a1a2e;">Welcome to Denver For All</h1>
            <p style="color: #555; line-height: 1.6;">
              Thanks for signing up. You'll receive updates on policy proposals, actions, and how to fight for a Denver that works for everyone.
            </p>
            <p style="color: #555; line-height: 1.6;">
              In the meantime, explore our platform:
            </p>
            <ul style="color: #555; line-height: 1.8;">
              <li><a href="https://denverforall.org/platform" style="color: #2563eb;">Read our policy proposals</a></li>
              <li><a href="https://denverforall.org/tools" style="color: #2563eb;">Use our community tools</a></li>
              <li><a href="https://denverforall.org/tools/candidate-tracker" style="color: #2563eb;">See where candidates stand</a></li>
              <li><a href="https://denverforall.org/take-action" style="color: #2563eb;">Take action now</a></li>
            </ul>
            <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 1.5rem 0;" />
            <p style="font-size: 0.8rem; color: #999;">
              Denver For All · denverforall.org<br/>
              You received this because you signed up at denverforall.org.
              <a href="mailto:info@denverforall.org?subject=Unsubscribe" style="color: #999;">Unsubscribe</a>
            </p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Resend API error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to send confirmation email" }),
        {
          status: 502,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err) {
    console.error("Subscribe error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

export const onRequestOptions: PagesFunction = async (context) => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin":
        context.request.headers.get("Origin") || "",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
