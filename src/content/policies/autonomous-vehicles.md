---
title: "Autonomous Vehicle Safety & Accountability"
titleEs: "Seguridad y Responsabilidad de Vehículos Autónomos"
summary: "Waymo is coming to Denver. Colorado has almost no rules. We need community safety standards, labor protections for displaced drivers, public transit integration, data privacy safeguards, and local democratic control over how self-driving cars operate on our streets."
summaryEs: "Waymo está llegando a Denver. Colorado casi no tiene reglas. Necesitamos estándares de seguridad comunitaria, protecciones laborales para conductores desplazados, integración con el transporte público, salvaguardas de privacidad de datos y control democrático local sobre cómo operan los autos autónomos en nuestras calles."
category: "infrastructure"
icon: "car"
order: 63
status: "draft"
actionTarget: "mayor"
hasFundingSources: true
keyStats:
  - value: "0"
    label: "AV regulations Denver currently has"
    labelEs: "regulaciones de vehiculos autonomos que Denver tiene actualmente"
    context: "No permits, no incident reporting, no data privacy rules"
    contextEs: "Sin permisos, sin reportes de incidentes, sin reglas de privacidad"
    source: "Colorado SB 17-213"
    theme: "danger"
  - value: "85%"
    label: "more vehicle-miles from ride-hailing vs trips replaced"
    labelEs: "mas millas-vehiculo de viajes compartidos vs viajes reemplazados"
    context: "Without rules, AVs increase congestion and emissions — they don't reduce them"
    contextEs: "Sin reglas, los VA aumentan la congestion y emisiones — no las reducen"
    source: "UC Davis / Schaller Consulting"
    theme: "danger"
  - value: "$0"
    label: "cost to Denver taxpayers"
    labelEs: "costo para los contribuyentes de Denver"
    context: "AV companies pay permit fees, per-trip assessments, and fund the Driver Transition Fund"
    contextEs: "Las empresas de VA pagan permisos, tasas por viaje y financian el Fondo de Transicion"
    theme: "primary"
---

## The Problem

Waymo is actively mapping Denver's streets and plans to launch driverless ride-hailing service in 2026. Denver will become one of the first major cities to host fully autonomous vehicles (AVs) in a state with almost no regulatory framework. Colorado's 2017 law (SB 17-213) is among the most permissive in the country: no state AV permit is required, no incident reporting is mandated, no first-responder protocols exist, no data transparency requirements are in place, and local governments are preempted from imposing their own AV regulations (Colorado Revised Statutes, Title 42, Article 4, Part 18).

This means Waymo can deploy hundreds of driverless vehicles on Denver streets with:

- No city approval or permitting process
- No obligation to report crashes, near-misses, or traffic obstructions to Denver
- No protocols for how AVs interact with first responders, construction zones, or severe weather
- No data privacy protections for the millions of images captured by AV cameras daily
- No labor transition plan for the thousands of Denver drivers whose jobs are at risk
- No requirement to integrate with or support public transit

Governor Polis vetoed HB 25-1122 in 2025, a bill that would have required a human operator in commercial autonomous vehicles. Colorado is now arguably the least regulated environment of any state with active AV deployment -- less regulated than Arizona, California, or Texas (National Conference of State Legislatures, AV Legislation Database, 2025).

Denver residents are rightly concerned. Waymo vehicles in San Francisco have blocked intersections, interfered with emergency responders, and clustered in residential neighborhoods honking at each other at 4 AM (San Francisco Municipal Transportation Agency incident reports, 2023-2024). In Phoenix, a Waymo vehicle struck a cyclist in 2023. Austin has documented 122 AV-related incidents since 2023 (Austin Transportation Department AV Dashboard, 2025). Denver's winter weather -- ice, snow, reduced visibility -- adds challenges that no AV fleet has operated in at scale.

### What Denver Currently Does

Denver has **no autonomous vehicle regulations, permitting framework, or oversight mechanism**. Colorado's preemption statute (SB 17-213) bars local governments from imposing requirements on AV operators beyond what state law requires, and state law requires almost nothing.

Denver's Department of Transportation and Infrastructure (DOTI) has no AV liaison, no incident tracking system, and no formal coordination with Waymo or any other AV operator. The city has not conducted a public impact assessment of AV deployment on traffic patterns, transit ridership, labor markets, or neighborhood quality of life.

By contrast:
- **San Francisco** has fought for local authority through lawsuits, state legislative advocacy, and development of model permitting frameworks, despite California's state preemption of direct municipal regulation.
- **New York City** permits only 8 test vehicles, requires safety drivers at all times, mandates regular data reporting, and requires cybersecurity certification (NYC Taxi & Limousine Commission, AV Rules, 2024).
- **Austin** maintains a public AV incident dashboard tracking all reported incidents despite lacking direct regulatory authority (Austin Transportation Department, 2025).

Denver is doing none of these things.

## Our Solution

### The Denver Autonomous Vehicle Accountability Act

#### 1. Emergency Response & Public Safety Standards

Modeled on California's AB 1777 (effective July 2026), the most comprehensive AV accountability law enacted in any state:

- **24/7 emergency response hotline:** AV operators must maintain a staffed hotline for Denver first responders to contact when AVs obstruct emergency operations, fail to yield, or are involved in incidents.
- **Two-way communication devices:** Every AV operating in Denver must have a mechanism for first responders and law enforcement to communicate directly with a remote operator.
- **Emergency geofencing compliance:** AV operators must comply within 60 minutes with any geofencing request from Denver OEM, Denver Fire, or Denver Police during emergencies, severe weather events, major construction, or large public gatherings. AVs must be capable of being remotely routed away from emergency zones.
- **Citation authority:** Denver traffic enforcement must be able to cite AV operators for traffic violations committed by autonomous vehicles, just as they would cite a human driver.
- **Winter weather protocols:** AV operators must file operational weather policies with DOTI, including defined conditions (snow accumulation, ice, visibility) under which AVs will cease or limit operations. Denver's 245 sunny days are an advantage, but the 120 that aren't require planning.

#### 2. Incident Reporting & Transparency

- **Mandatory incident reporting:** AV operators must report all crashes, near-misses, traffic obstructions exceeding 5 minutes, and first-responder interactions to DOTI within 24 hours. Reports must include AV sensor data, remote operator logs, and geolocation data.
- **Public incident dashboard:** DOTI publishes all AV incident data on a public dashboard, updated weekly, modeled on Austin's AV incident tracker.
- **Quarterly safety reports:** AV operators submit quarterly reports to DOTI including: total vehicle-miles traveled, incidents per mile, disengagement rates, response times to emergency geofencing requests, and complaint data.
- **Independent safety audits:** Annual third-party safety audits of all AV operators, funded by operator fees, with results published publicly.

#### 3. Data Privacy & Surveillance Protections

AV cameras capture continuous high-resolution imagery of every street, sidewalk, and building they pass. A fleet of 500 AVs operating 12 hours per day creates a pervasive surveillance network that no Denver resident consented to.

- **Data minimization:** AV operators may retain raw camera and sensor data for no more than 72 hours unless related to a specific incident under investigation.
- **No sale of data:** AV operators are prohibited from selling, licensing, or sharing camera, sensor, or location data with third parties, including data brokers and advertisers.
- **Law enforcement access only by warrant:** Denver police and any other law enforcement agency may access AV sensor data only through a valid warrant issued by a court. No bulk data requests. No standing agreements. No ICE access, consistent with Denver's sanctuary city protections. (See: [Immigration & Sanctuary City](/platform/immigration-sanctuary) and the Flock camera precedent in [Community Safety & Police Reform](/platform/public-safety).)
- **Facial recognition ban:** AV operators may not use onboard cameras for facial recognition, behavioral profiling, or identification of individuals, whether for the operator's own purposes or at the request of any third party.
- **Annual privacy audit:** Independent privacy audit of all AV operators' data practices, funded by operator fees, with results published publicly.

#### 4. Labor Transition & Worker Protections

Autonomous vehicles threaten the livelihoods of thousands of Denver workers: rideshare drivers, taxi drivers, delivery drivers, and commercial vehicle operators. No city in the country has enacted a comprehensive labor transition program for AV-displaced workers. Denver should be the first.

- **AV Operator Assessment:** AV ride-hailing and delivery operators pay a per-trip fee of $0.50-$1.00 on every autonomous trip completed in Denver, deposited into the Denver Driver Transition Fund.
- **Denver Driver Transition Fund:** Provides displaced drivers with:
  - Up to 12 months of income support at 80% of prior average earnings
  - Free retraining and certification programs (CDL conversion, EV maintenance, transit operations, AV fleet management)
  - Priority hiring for Denver city positions, RTD operations, and AV operator jobs (remote monitoring, fleet maintenance)
  - Health insurance continuation during transition
- **AV operator hiring requirements:** AV companies operating in Denver must fill at least 30% of local positions (remote operators, fleet technicians, customer service) from the pool of displaced transportation workers.
- **No net job loss commitment:** AV operators must submit annual employment impact reports. If AV deployment causes net job losses in Denver's transportation sector exceeding 5% in any year, the per-trip assessment automatically increases to fund expanded transition support.

#### 5. Public Transit Integration

AVs must complement Denver's public transit system, not undermine it. In cities without integration requirements, ride-hailing (including autonomous) has been shown to reduce transit ridership and increase vehicle-miles traveled (UC Davis Institute of Transportation Studies, 2020).

- **Transit-first zones:** In areas within half a mile of RTD rail stations and high-frequency bus routes, AV ride-hailing is restricted to trips that begin or end at a transit stop (first/last mile service), not direct point-to-point trips that compete with transit.
- **RTD integration:** AV operators must offer seamless fare integration with RTD, allowing riders to use a single payment method across transit and AV services.
- **Congestion pricing for AVs:** Autonomous vehicles operating without passengers (deadheading) are subject to a per-mile congestion fee in downtown Denver and other high-traffic zones. Empty AVs circling to avoid parking charges worsen congestion without serving anyone.
- **Microtransit partnership:** AV operators must bid on RTD microtransit contracts (Denver Connector-style service) in transit deserts like Montbello, Far Northeast, and Green Valley Ranch before operating premium ride-hailing in high-demand areas. Modeled on the Chandler, Arizona / Waymo / Via partnership, which provides $1-2 rides with discounts for seniors, people with disabilities, and free rides for students (City of Chandler, 2024).

#### 6. Accessibility Requirements

AVs have the potential to transform mobility for the 61 million Americans with disabilities -- but only if they are designed for inclusion from the start, not retrofitted as an afterthought.

- **Wheelchair-accessible vehicles:** At least 20% of any AV fleet operating in Denver must be wheelchair-accessible from day one of operations, increasing to 50% within 5 years.
- **Assistive technology:** All AVs must support audio navigation, braille-compatible interfaces, and communication with riders who are deaf, blind, or have cognitive disabilities.
- **ADA compliance:** Full compliance with the Americans with Disabilities Act, with Denver conducting independent accessibility audits.
- **Equity pricing:** AV operators must offer reduced fares for riders with disabilities, seniors 65+, and households below 200% FPL, matching or exceeding RTD LiVE discount levels.

#### 7. Democratic Oversight & Community Control

- **Denver AV Advisory Board:** A city council-appointed board including representatives from: neighborhood organizations (especially from neighborhoods where AVs will operate), disability rights organizations, labor unions (Teamsters, taxi/rideshare driver organizations), transit advocates, privacy/civil liberties groups, and DOTI staff. The board reviews all AV operator applications, monitors safety data, and makes binding recommendations on operational restrictions.
- **Neighborhood consent:** Before expanding AV operations into any new Denver neighborhood, operators must hold a public meeting with at least 30 days notice, present safety data from existing operations, and receive approval from the AV Advisory Board. No deployment by fiat.
- **Annual public hearing:** City council holds an annual public hearing on AV operations in Denver, with testimony from the AV Advisory Board, AV operators, labor representatives, and community members.

### International & Domestic Evidence: How Other Cities Are Handling AVs

| City/State | Approach | Result |
|-----------|----------|--------|
| **California (AB 1777, 2026)** | Emergency response hotlines, two-way communication, geofencing compliance, citation authority, manufacturer liability for AV traffic violations. | Most comprehensive AV accountability law in any US state. Sets the standard for emergency response integration. |
| **New York City** | Only 8 test vehicles permitted. Safety driver required. Regular data reporting. Cybersecurity certification. Strict municipal permitting. | Demonstrates that meaningful local control is possible and that AV companies will comply with strict requirements. |
| **Chandler, AZ / Waymo / Via** | Integrated AVs into public microtransit (Chandler Flex). $1-2/ride. Discounts for seniors and people with disabilities. Free for students. | Leading model for AVs complementing rather than competing with public transit. Equity-focused pricing. |
| **Austin, TX** | Public AV incident dashboard (122 incidents since 2023). No direct regulatory authority due to state preemption, but transparency through data publication. | Shows that transparency is achievable even without direct regulation. |
| **Texas (SB 2807, 2025)** | State DMV authorization required. Recording devices mandatory. First-responder interaction plans required. | Moved from near-zero regulation to meaningful state-level requirements. |
| **European Union** | AV Framework Regulation (EU 2022/1426) requires type-approval, cybersecurity certification, and data recording. | Continental-scale regulatory framework with mandatory safety standards. |

**The pattern is clear:** Cities and states that proactively regulate AVs get better outcomes than those that allow unregulated deployment. Companies comply with requirements because they need access to markets. Denver's leverage is its 700,000+ residents and growing demand for ride-hailing.

## How We Pay For It

This is primarily a regulatory framework funded by the companies that profit from operating AVs on Denver's streets.

- **AV Operator Permit Fee:** $50,000-$100,000 annual permit fee per operator, plus $500/vehicle/year. Covers DOTI oversight, incident dashboard, and AV Advisory Board operations.
- **Per-Trip Assessment:** $0.50-$1.00 per autonomous trip funds the Driver Transition Fund and transit integration requirements.
- **Congestion Fee:** Per-mile fee on deadheading AVs in high-traffic zones generates revenue for transit and road maintenance.
- **Privacy & Safety Audit Fees:** AV operators fund independent audits of their safety and data practices.
- **Estimated total revenue:** $5-15M/year depending on fleet size and trip volume, more than sufficient to fund city oversight and the Driver Transition Fund.
- **Net cost to Denver taxpayers:** Zero. AV operators pay for the privilege of using Denver's streets commercially.

## Frequently Asked Questions

**"Colorado preempts local AV regulation. Can Denver do this?"**
Colorado's preemption (SB 17-213) is broad but not absolute. Denver's home rule authority under the Colorado Constitution (Article XX) provides significant power to regulate activities within city limits for health, safety, and welfare purposes. Traffic regulation, permitting for commercial operations, data privacy, and labor standards are all areas where Denver has exercised local authority. Some provisions (incident reporting, permitting) may require state legislative change. Denver should implement what it can now, advocate for state reform, and challenge preemption where necessary. San Francisco has pursued exactly this strategy in California.

**"Won't this scare AV companies away from Denver?"**
Waymo operates in San Francisco under California's stringent regulatory framework, including AB 1777's emergency response requirements. They operate in Phoenix under AV-specific state requirements. Companies go where the customers are. Denver's growing population and ride-hailing demand ensure market access -- and reasonable regulation makes deployment safer and more politically sustainable for AV companies themselves. Unregulated deployment that produces backlash is worse for AV companies than clear rules.

**"Aren't autonomous vehicles safer than human drivers?"**
AV companies claim their vehicles are safer per mile than human drivers, but the data is limited and self-reported. Waymo published a peer-reviewed study claiming 57% fewer injury-causing crashes (Waymo Safety Report, 2023), but independent verification is difficult because companies control the data. What we do know: AVs in San Francisco have blocked fire trucks, run over downed power lines, and driven into wet concrete (SFMTA incident logs, 2023-2024). Denver's ice and snow present challenges no AV fleet has operated in at scale. Safety claims should be verified by independent audits, not taken on faith.

**"Won't AVs reduce traffic and emissions?"**
Potentially, but the evidence is mixed. Studies from UC Davis found that ride-hailing (including Uber and Lyft) increased vehicle-miles traveled by 85% compared to the trips they replaced, because of deadheading (driving empty between fares) and induced demand (people taking car trips instead of transit, walking, or biking) (Schaller Consulting, 2018; UC Davis ITS, 2020). Without congestion pricing, transit integration, and deadheading fees, AVs could make traffic and emissions worse, not better.

**"What about the jobs? Isn't this just delaying the inevitable?"**
Automation is not a natural disaster. It is a policy choice about who benefits and who bears the costs. When Denver automated parking meters, it didn't leave meter attendants destitute -- it transitioned them to other city roles. The Driver Transition Fund ensures that the workers who built Denver's ride-hailing and delivery economy aren't discarded when their labor is automated. Every major technological transition in history has required public policy to distribute benefits fairly. This is no different.

**"I'm worried about AV cameras surveilling my neighborhood."**
You should be. A fleet of 500 AVs with high-resolution cameras operating 12+ hours daily creates a surveillance network more pervasive than any city camera system. Denver's experience with Flock license plate readers (1,400+ ICE searches without public knowledge) demonstrates what happens when surveillance technology is deployed without democratic oversight. Our data privacy provisions -- 72-hour retention limits, warrant requirements, no ICE access, facial recognition ban -- apply the lessons of the Flock debacle to AV surveillance before it's too late.

## Who Opposes This (and Why)

- **Waymo (Alphabet/Google)** and other AV companies prefer to operate with minimal regulation. They lobby state legislatures for preemption of local authority and against incident reporting requirements.
- **Governor Polis** vetoed HB 25-1122 (human operator requirement) and has signaled support for permissive AV policy. The governor's office frames AV deployment as economic development.
- **Colorado tech industry lobbyists** argue that regulation will drive AV companies to other states. The evidence from California (the strictest regulatory environment and the largest AV market) contradicts this.
- **Some urbanist/tech advocates** argue AVs will reduce car ownership and improve mobility. This is possible but not guaranteed without the integration and equity requirements in our proposal.

## References

- Colorado SB 17-213. (2017). Concerning the Operation of Autonomous Vehicles. (State AV framework; local preemption provisions.)
- Colorado HB 25-1122. (2025). Concerning Humans Operating Certain Motor Vehicles. (Vetoed by Governor Polis.)
- California AB 1777. (2025, effective July 2026). Autonomous vehicles: emergency services. (Emergency response hotline, geofencing, citation authority, two-way communication requirements.)
- Texas SB 2807. (2025). Relating to the operation of automated motor vehicles. (State authorization, recording devices, first-responder plans.)
- NYC Taxi & Limousine Commission. (2024). Autonomous Vehicle Testing Rules. (Permitting, safety driver requirement, data reporting.)
- National Conference of State Legislatures. (2025). Autonomous Vehicles Legislation Database. (State-by-state AV regulatory comparison.)
- Waymo. (2023). Waymo Safety Report: Collision Comparisons. (Self-reported safety data; 57% fewer injury-causing crashes claim.)
- San Francisco Municipal Transportation Agency. (2023-2024). AV Incident Reports. (Documented AV interference with emergency responders, traffic obstructions.)
- Austin Transportation Department. (2025). Autonomous Vehicle Incident Dashboard. (122 documented incidents.)
- City of Chandler, AZ. (2024). Chandler Flex Microtransit / Waymo Partnership. (Transit integration model; equity pricing.)
- UC Davis Institute of Transportation Studies. (2020). "Disruptive Transportation: The Adoption, Utilization, and Impacts of Ride-Hailing in the United States." (VMT increase from ride-hailing.)
- Schaller Consulting. (2018). "The New Automobility: Lyft, Uber and the Future of American Cities." (85% VMT increase estimate.)
- ACLU of Colorado. (2025). Surveillance technology and AV data privacy concerns. (Flock camera precedent for AV surveillance risks.)
- European Union. (2022). Regulation 2022/1426. General safety and automated driving systems type-approval framework.
- Federal AV Accessibility Act (H.R. 7126). (2024). Proposed requirements for AV accessibility for people with disabilities.
