/**
 * Newsletter signup — Cloudflare Pages Function.
 *
 * When forking for another city, update the constants below.
 * These mirror values in src/config/site.ts but are duplicated here because
 * Cloudflare Pages Functions cannot import from the Astro source tree.
 */

// ── Fork: update these values to match src/config/site.ts ─────────────────
const SITE_NAME = 'Denver For All';
const SITE_DOMAIN = 'denverforall.org';
const SITE_EMAIL = 'info@denverforall.org';
// ──────────────────────────────────────────────────────────────────────────

interface Env {
  RESEND_API_KEY: string;
}

const ALLOWED_ORIGINS = [
  `https://${SITE_DOMAIN}`,
  `https://www.${SITE_DOMAIN}`,
  'http://localhost:4321',
  'http://localhost:3000',
];

function getCorsOrigin(request: Request): string {
  const origin = request.headers.get('Origin') || '';
  return ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const allowedOrigin = getCorsOrigin(context.request);
  const corsHeaders = {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  const formData = await context.request.formData();
  const email = formData.get('email');

  if (!email || typeof email !== 'string') {
    return new Response(JSON.stringify({ error: 'Email is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: 'Invalid email address' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${SITE_NAME} <${SITE_EMAIL}>`,
        to: [email],
        subject: `Welcome to ${SITE_NAME}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 2rem;">
            <h1 style="font-size: 1.5rem; color: #1a1a2e;">Welcome to ${SITE_NAME}</h1>
            <p style="color: #555; line-height: 1.6;">
              Thanks for signing up. You'll receive updates on policy proposals, actions, and how to fight for a city that works for everyone.
            </p>
            <p style="color: #555; line-height: 1.6;">
              In the meantime, explore our platform:
            </p>
            <ul style="color: #555; line-height: 1.8;">
              <li><a href="https://${SITE_DOMAIN}/platform" style="color: #2563eb;">Read our policy proposals</a></li>
              <li><a href="https://${SITE_DOMAIN}/tools" style="color: #2563eb;">Use our community tools</a></li>
              <li><a href="https://${SITE_DOMAIN}/tools/candidate-tracker" style="color: #2563eb;">See where candidates stand</a></li>
              <li><a href="https://${SITE_DOMAIN}/take-action" style="color: #2563eb;">Take action now</a></li>
            </ul>
            <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 1.5rem 0;" />
            <p style="font-size: 0.8rem; color: #999;">
              ${SITE_NAME} · ${SITE_DOMAIN}<br/>
              You received this because you signed up at ${SITE_DOMAIN}.
              <a href="mailto:${SITE_EMAIL}?subject=Unsubscribe" style="color: #999;">Unsubscribe</a>
            </p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Failed to send confirmation email' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (_err) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
};

export const onRequestOptions: PagesFunction = async (context) => {
  const allowedOrigin = getCorsOrigin(context.request);
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
