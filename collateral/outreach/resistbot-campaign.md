# Deliverable 5: Highest-Impact Resistbot Campaign

## Strategic Reasoning

**Existing campaign inventory (11 campaigns):**

| #   | Campaign                           | Target | Topic        |
| --- | ---------------------------------- | ------ | ------------ |
| 1   | Repeal Rent Control Ban            | state  | Housing      |
| 2   | Turn Off Flock Cameras             | mayor  | Surveillance |
| 3   | State Surveillance Oversight Law   | state  | Surveillance |
| 4   | Ban Dark Money                     | state  | Democracy    |
| 5   | Vacancy Tax (HB26-1036)            | state  | Housing      |
| 6   | Collective Bargaining (HB26-1005)  | state  | Labor        |
| 7   | Eviction Protections (HB26-1106)   | state  | Housing      |
| 8   | Surveillance Technology (SB26-071) | state  | Surveillance |
| 9   | Immigration Enforcement (SB26-005) | state  | Immigration  |
| 10  | Energy Affordability (SB26-002)    | state  | Energy       |
| 11  | Charter Reform                     | mayor  | Democracy    |

**Pattern:** 9 of 11 target state legislators. 2 target the mayor. Zero target Congress. Zero target city council. 3 cover surveillance, 3 cover housing. Zero cover healthcare, childcare, broadband, or STAR program.

**Recommendation: Medical Debt Forgiveness — targeting the mayor**

**Why this campaign:**

1. **Fills a major policy gap:** Healthcare/medical debt is the platform's strongest policy area for emotional resonance and has zero Resistbot coverage. The communications review specifically flagged expanding Resistbot from 5 to 15-20 campaigns as "the single highest-leverage communications gap."

2. **Targets an underrepresented official:** 9 of 11 campaigns target state legislators. The mayor is targeted by only 2 (Flock cameras and charter reform — both adversarial). A medical debt campaign targeting the mayor is _constructive_ — it asks the mayor to do something popular, not to stop doing something unpopular. This is strategically different. It gives the mayor a win he can take, which increases the odds of action.

3. **No legislative barrier:** Unlike rent control (blocked by CRS 38-12-301) or broadband (requires capital investment and political will), medical debt forgiveness requires only a city council appropriation. The mayor can champion this with a budget proposal. There is no state preemption, no TABOR issue, no legal obstacle. The mechanism exists (Undue Medical Debt), the precedent exists (15+ cities), and the money exists ($5M from a $1.6B+ budget).

4. **Broadest emotional resonance:** Medical debt affects people across income levels, party lines, and demographics. It's the closest thing to a universally relatable policy on the platform. A Resistbot letter about medical debt has the highest chance of being shared by people who wouldn't share a surveillance or housing campaign.

5. **Strongest data for a 150-300 word letter:** Toledo $240M for $1.6M. Denver Health sends patients to collections. $5M can forgive $100-500M. 530,000 Americans bankrupted by medical bills annually. Every other wealthy country: zero. This writes itself.

**Alternatives I considered:**

- _STAR Program expansion (mayor):_ Strong data from Urban Institute evaluation. But "redirect 15% of police overtime budget" is a harder ask in a letter than "appropriate $5M." Holding this for a future campaign.
- _Municipal broadband (mayor):_ 85% voter approval is compelling, but the $300-500M capital investment makes the ask too large for a single letter. Better as a longer-term pressure campaign.
- _Childcare (state + mayor):_ No single bill to rally around. The three childcare bills (HB26-1004, SB26-019, SB26-020) are incremental. A childcare campaign would work better when a structural bill is introduced.
- _STAR expansion (congress):_ Could target federal delegation for SAMHSA funding. Holding for a future "federal delegation" campaign batch.

---

## The Campaign

```
CAMPAIGN TITLE (English): Forgive Denver's Medical Debt
CAMPAIGN TITLE (Spanish): Perdonar la Deuda Médica de Denver
TARGET: "mayor" (Mayor Johnston)
ICON: heart-pulse
BADGE: none
RELATED POLICY: denverforall.org/platform/healthcare
```

### LETTER TEXT (English):

Mayor Johnston,

I urge you to include a $5 million medical debt forgiveness program in Denver's next budget. Cities across the country are partnering with Undue Medical Debt to buy medical debt portfolios at pennies on the dollar — debt buyers pay 1 to 5 cents per dollar — and cancel them outright. Toledo forgave $240 million in medical debt for a $1.6 million city investment. New Orleans forgave $130 million. Chicago and Cook County have done the same.

Denver Health is a public hospital. It still sends patients to collections and places liens on homes. A $5 million appropriation from Denver's $1.6 billion budget could forgive $100 to $500 million in medical debt for Denver residents. The mechanism exists. The precedent exists in over 15 cities. The money exists.

Every other wealthy nation has zero medical bankruptcies. The United States has 530,000 per year. Denver cannot fix the national healthcare system, but Denver can do what Toledo, New Orleans, and Chicago have already done: buy the debt and cancel it.

Please champion a medical debt forgiveness program for Denver. It is the highest-return investment in human dignity this city can make.

### LETTER TEXT (Spanish):

Alcalde Johnston,

Le pido que incluya un programa de perdón de deuda médica de $5 millones en el próximo presupuesto de Denver. Ciudades de todo el país se están asociando con Undue Medical Debt para comprar carteras de deuda médica a centavos por dólar — los compradores de deuda pagan de 1 a 5 centavos por dólar — y cancelarlas por completo. Toledo perdonó $240 millones en deuda médica con una inversión de $1.6 millones. Nueva Orleans perdonó $130 millones. Chicago y el Condado Cook han hecho lo mismo.

Denver Health es un hospital público. Todavía envía pacientes a cobranza y pone gravámenes sobre sus hogares. Una asignación de $5 millones del presupuesto de $1.6 mil millones de Denver podría perdonar de $100 a $500 millones en deuda médica para los residentes de Denver. El mecanismo existe. El precedente existe en más de 15 ciudades. El dinero existe.

Todos los demás países ricos tienen cero bancarrotas médicas. Estados Unidos tiene 530,000 por año. Denver no puede arreglar el sistema nacional de salud, pero Denver puede hacer lo que Toledo, Nueva Orleans y Chicago ya hicieron: comprar la deuda y cancelarla.

Por favor, defienda un programa de perdón de deuda médica para Denver. Es la inversión de mayor retorno en dignidad humana que esta ciudad puede hacer.

---

## The HTML

Drop this directly into `resistbot.astro` inside the `<div class="campaigns">` container, after the existing campaigns:

```html
<!-- Campaign 12: Medical Debt Forgiveness -->
<div class="campaign" id="campaign-medical-debt">
  <div class="campaign__header">
    <div class="campaign__icon"><Icon name="lucide:heart-pulse" size="{22}" /></div>
    <div>
      <h3 data-en="Forgive Denver's Medical Debt" data-es="Perdonar la Deuda Médica de Denver">
        Forgive Denver's Medical Debt
      </h3>
      <div class="campaign__meta">
        <span
          class="campaign__target"
          data-en='Target: "mayor" (Mayor Johnston)'
          data-es='Objetivo: "mayor" (Alcalde Johnston)'
          >Target: "mayor" (Mayor Johnston)</span
        >
      </div>
    </div>
  </div>
  <div class="campaign__letter" id="letter-medical-debt">
    Mayor Johnston, I urge you to include a $5 million medical debt forgiveness program in Denver's
    next budget. Cities across the country are partnering with Undue Medical Debt to buy medical
    debt portfolios at pennies on the dollar — debt buyers pay 1 to 5 cents per dollar — and cancel
    them outright. Toledo forgave $240 million in medical debt for a $1.6 million city investment.
    New Orleans forgave $130 million. Chicago and Cook County have done the same. Denver Health is a
    public hospital. It still sends patients to collections and places liens on homes. A $5 million
    appropriation from Denver's $1.6 billion budget could forgive $100 to $500 million in medical
    debt for Denver residents. The mechanism exists. The precedent exists in over 15 cities. The
    money exists. Every other wealthy nation has zero medical bankruptcies. The United States has
    530,000 per year. Denver cannot fix the national healthcare system, but Denver can do what
    Toledo, New Orleans, and Chicago have already done: buy the debt and cancel it. Please champion
    a medical debt forgiveness program for Denver. It is the highest-return investment in human
    dignity this city can make.
  </div>
  <div class="campaign__actions">
    <button
      class="btn btn--primary copy-btn"
      data-letter="letter-medical-debt"
      data-en="Copy Letter"
      data-es="Copiar Carta"
    >
      Copy Letter
    </button>
    <span class="copy-confirm" data-en="Copied!" data-es="¡Copiado!"></span>
  </div>
</div>
```

**Note:** This campaign doesn't have a petition yet. After adding it to resistbot.astro, create a Resistbot petition by texting "petition" to 50409 and following the prompts. Once the petition URL is generated, add a "Sign Petition" button to the campaign's `campaign__actions` div:

```html
<a
  href="https://resist.bot/petitions/[CODE]"
  target="_blank"
  rel="noopener"
  class="btn btn--secondary"
  data-en="Sign Petition"
  data-es="Firmar Petición"
  >Sign Petition</a
>
```

And add a corresponding card to the "Active Petitions" grid section below:

```html
<a href="https://resist.bot/petitions/[CODE]" target="_blank" rel="noopener" class="petition-card">
  <h3 data-en="Forgive Denver's Medical Debt" data-es="Perdonar la Deuda Médica de Denver">
    Forgive Denver's Medical Debt
  </h3>
  <p
    class="petition-card__sms"
    data-en='Text "sign [CODE]" to 50409'
    data-es='Escribe "sign [CODE]" al 50409'
  >
    Text "sign [CODE]" to 50409
  </p>
</a>
```
