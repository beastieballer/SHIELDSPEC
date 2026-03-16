const stats = [
  { num: "30+", label: "Years in Security Glazing" },
  { num: "500+", label: "Classified Installations" },
  { num: "48hr", label: "Average Initial Quote Window" },
  { num: "100%", label: "Documentation Traceability" },
];

const agencies = [
  "DOD (Department of Defense)",
  "DIA (Defense Intelligence Agency)",
  "CIA (Central Intelligence Agency)",
  "FBI (Federal Bureau of Investigation)",
  "U.S. Military Programs",
  "NSA (National Security Agency)",
  "White House Programs",
  "Pentagon Program Offices",
];

const problems = [
  {
    icon: "01",
    title: "Regulatory Complexity",
    desc: "ICD 705, TEMPEST, RF attenuation, and mission-specific overlays require exact interpretation to avoid rework.",
  },
  {
    icon: "02",
    title: "Cleared Talent Bottlenecks",
    desc: "Qualified teams with the right clearances and installation history are limited and often oversubscribed.",
  },
  {
    icon: "03",
    title: "Mission Timeline Risk",
    desc: "A failed inspection can delay accreditation, occupancy, and operations across critical national security programs.",
  },
];

const workflow = [
  {
    step: "01",
    title: "Secure Intake",
    desc: "Submit facility profile, compliance objectives, and timeline constraints. We structure requirements into an audit-ready scope.",
  },
  {
    step: "02",
    title: "Specification and Match",
    desc: "ShieldSpec generates exact film and installation criteria, then aligns you with vetted providers for your mission profile.",
  },
  {
    step: "03",
    title: "Install, Verify, Document",
    desc: "Execution includes certification artifacts, inspection package readiness, and a documented path to compliance closure.",
  },
];

const services = [
  {
    title: "SCIF Window Film (ICD 705)",
    desc: "Facility-specific standards mapping for Sensitive Compartmented Information Facilities.",
  },
  {
    title: "TEMPEST and RF Shielding",
    desc: "Signal attenuation solutions designed for electromagnetic emission control requirements.",
  },
  {
    title: "Blast and Forced Entry",
    desc: "GSA-aligned security film guidance for threat resistance and perimeter hardening.",
  },
  {
    title: "Federal Energy and Solar Film",
    desc: "Security-conscious energy control films that support sustainability targets.",
  },
  {
    title: "Compliance Documentation",
    desc: "Inspection-ready submittals, installation records, and chain-of-custody documentation.",
  },
  {
    title: "Lifecycle Maintenance",
    desc: "Programmatic inspections and replacement planning to preserve long-term compliance.",
  },
];

const testimonials = [
  {
    quote:
      "ShieldSpec reduced our specification cycle from weeks to days and removed uncertainty from procurement and install sequencing.",
    role: "Facility Security Officer, Defense Contractor",
  },
  {
    quote:
      "The quality of installer matching and compliance documentation was the difference between delay and on-time accreditation.",
    role: "Program Manager, Intelligence Program",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="ambient-grid" aria-hidden />

      <nav className="fixed inset-x-0 top-0 z-50 border-b border-navy-mid/80 bg-navy/88 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold tracking-tight text-shield-gold">
              Shield<span className="text-ice">Spec</span>
            </span>
            <span className="rounded border border-steel/25 bg-navy-mid px-2 py-0.5 text-[10px] uppercase tracking-[0.22em] text-steel-light">
              secure compliance
            </span>
          </div>
          <a
            href="#contact"
            className="rounded bg-shield-gold px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-shield-gold-light"
          >
            Request Assessment
          </a>
        </div>
      </nav>

      <section className="relative overflow-hidden px-6 pb-20 pt-32">
        <div className="hero-glow" aria-hidden />
        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-block rounded-full border border-shield-gold/35 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-shield-gold">
            SCIF and TEMPEST Compliance
          </div>
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
            National Security Grade
            <br />
            <span className="text-shield-gold">Window Film Compliance</span>
            <br />
            Delivered with Certainty
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-steel-light md:text-xl">
            ShieldSpec provides AI-assisted specification, sourcing, and installation brokerage for classified and high-security facilities. Built for teams that cannot afford compliance ambiguity.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#contact"
              className="rounded bg-shield-gold px-8 py-4 text-lg font-bold text-navy transition hover:bg-shield-gold-light"
            >
              Get a Free Compliance Assessment
            </a>
            <a
              href="#how"
              className="rounded border border-steel/35 px-8 py-4 text-lg font-semibold text-ice transition hover:border-steel"
            >
              How It Works
            </a>
          </div>
        </div>
      </section>

      <section className="border-y border-navy-mid/80 px-6 py-8">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 text-center md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-bold text-shield-gold md:text-3xl">{s.num}</div>
              <div className="mt-1 text-sm text-steel">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto max-w-6xl rounded-xl border border-navy-mid bg-navy-light/45 p-6">
          <p className="mb-4 text-center text-xs uppercase tracking-[0.24em] text-steel">
            Mission Areas Supported
          </p>
          <div className="grid grid-cols-2 gap-3 text-center md:grid-cols-4">
            {agencies.map((name) => (
              <div
                key={name}
                className="rounded border border-navy-mid/80 bg-navy/70 px-3 py-3 text-xs text-steel-light"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">The Problem</h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-steel-light">
            Classified facility window film decisions carry operational and accreditation risk. Mistakes can impact schedules, budgets, and mission readiness.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {problems.map((c) => (
              <article
                key={c.title}
                className="rounded-xl border border-navy-mid bg-navy-light/40 p-6 shadow-card"
              >
                <div className="mb-3 text-xl font-bold text-shield-gold">{c.icon}</div>
                <h3 className="mb-2 text-lg font-semibold">{c.title}</h3>
                <p className="text-sm leading-relaxed text-steel">{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="bg-navy-light/45 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">How ShieldSpec Works</h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-steel-light">
            A secure, structured process from requirements intake to certified installation closeout.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {workflow.map((s) => (
              <article key={s.step} className="text-center">
                <div className="mb-3 text-5xl font-bold text-shield-gold/25">{s.step}</div>
                <h3 className="mb-2 text-lg font-semibold">{s.title}</h3>
                <p className="text-sm leading-relaxed text-steel">{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">What We Cover</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((s) => (
              <article
                key={s.title}
                className="flex gap-4 rounded-xl border border-navy-mid bg-navy-light/40 p-5"
              >
                <div className="mt-0.5 text-xl text-shield-gold">+</div>
                <div>
                  <h3 className="mb-1 font-semibold">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-steel">{s.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-light/45 px-6 py-20">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="mb-12 text-3xl font-bold md:text-4xl">
            Trusted by Teams That Cannot Miss
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((t) => (
              <article
                key={t.role}
                className="rounded-xl border border-navy-mid bg-navy/80 p-6 text-left"
              >
                <p className="mb-4 italic leading-relaxed text-steel-light">"{t.quote}"</p>
                <p className="text-sm font-semibold text-shield-gold">- {t.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 py-20">
        <div className="mx-auto max-w-2xl rounded-xl border border-navy-mid bg-navy-light/30 p-7">
          <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
            Request a Free Compliance Assessment
          </h2>
          <p className="mb-10 text-center text-lg text-steel-light">
            Share your facility profile and project objectives. We will respond with a scoped recommendation and next-step plan.
          </p>
          <form
            action="https://formspree.io/f/placeholder"
            method="POST"
            className="space-y-5"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm text-steel">Name</label>
                <input name="name" required className="field" type="text" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-steel">Email</label>
                <input name="email" required className="field" type="email" />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm text-steel">Organization</label>
                <input name="organization" className="field" type="text" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-steel">Phone</label>
                <input name="phone" className="field" type="tel" />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm text-steel">Facility Type</label>
              <select name="facility_type" className="field">
                <option value="">Select...</option>
                <option value="scif">SCIF</option>
                <option value="sapf">SAP Facility (SAPF)</option>
                <option value="tempest">TEMPEST Zone</option>
                <option value="government">Government Office</option>
                <option value="defense_contractor">Defense Contractor Facility</option>
                <option value="embassy">Embassy / Consulate</option>
                <option value="other">Other Classified Space</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm text-steel">Compliance Requirements</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "ICD 705",
                  "TEMPEST",
                  "RF Shielding",
                  "Blast Mitigation",
                  "Forced Entry",
                  "Solar / Energy",
                ].map((req) => (
                  <label key={req} className="flex items-center gap-2 text-sm text-steel-light">
                    <input
                      type="checkbox"
                      name="requirements"
                      value={req}
                      className="accent-shield-gold"
                    />
                    {req}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm text-steel">Project Details</label>
              <textarea
                name="details"
                rows={4}
                placeholder="Number of windows, square footage, timeline, and any mission-specific constraints"
                className="field"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded bg-shield-gold py-4 text-lg font-bold text-navy transition hover:bg-shield-gold-light"
            >
              Submit Assessment Request
            </button>
            <p className="text-center text-xs text-steel">
              All inquiries are handled with strict confidentiality and a need-to-know posture.
            </p>
          </form>
        </div>
      </section>

      <footer className="border-t border-navy-mid px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-lg font-bold text-shield-gold">
            Shield<span className="text-ice">Spec</span>
            <span className="text-sm font-normal text-steel">.ai</span>
          </div>
          <div className="text-sm text-steel">
            {new Date().getFullYear()} ShieldSpec. All rights reserved.
          </div>
          <div className="text-xs text-steel">
            Veteran-Owned | ITAR Compliant | Made in the USA
          </div>
        </div>
      </footer>
    </main>
  );
}
