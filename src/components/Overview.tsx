type OverviewProps = {
  lang: "fr" | "en";
};

const headings = {
  fr: {
    tag: "Philosophie du projet",
    title: "Une architecture réseau robuste, pensée pour la sécurité et l'agilité",
    desc: "En s'appuyant sur l'Infrastructure as Code, ce lab démontre l'excellence opérationnelle requise dans les environnements cloud professionnels.",
    cards: [
      {
        title: "1. Conception & Segmentation",
        text: "Mise en œuvre des meilleures pratiques de cybersécurité cloud : séparation des front-ends accessibles depuis l'extérieur des back-ends hautement sensibles stockés dans l'infrastructure privée.",
        icon: "🌐",
      },
      {
        title: "2. Automatisation Totale",
        text: "Élimination des erreurs humaines et gain de temps drastique. L'infrastructure se déploie de manière prévisible, modulaire et auditable via l'outil de référence de l'industrie : Terraform.",
        icon: "⚙️",
      },
      {
        title: "3. Traçabilité & Observabilité",
        text: "Toutes les ressources réseau, tables de routage, NAT Gateways et Elastic IP sont facilement cartographiées et auditées en temps réel grâce à la console AWS, validant l'état attendu.",
        icon: "👁️‍عون",
      },
    ],
  },
  en: {
    tag: "Project Philosophy",
    title: "A robust network architecture designed for security and agility",
    desc: "By leveraging Infrastructure as Code, this lab demonstrates the operational excellence required in professional cloud environments.",
    cards: [
      {
        title: "1. Design & Segmentation",
        text: "Implementing top cloud security practices: separation of public-facing front-ends from highly sensitive back-ends stored in the private infrastructure.",
        icon: "🌐",
      },
      {
        title: "2. Total Automation",
        text: "Eliminating human error and achieving massive time savings. The infrastructure is deployed in a predictable, modular, and auditable way using the industry standard: Terraform.",
        icon: "⚙️",
      },
      {
        title: "3. Traceability & Observability",
        text: "All network resources, route tables, NAT Gateways, and Elastic IPs are easily mapped and audited in real time within the AWS console, confirming the expected state.",
        icon: "👁️‍عون",
      },
    ],
  },
};

export default function Overview({ lang }: OverviewProps) {
  const current = headings[lang];
  return (
    <section id="apercu" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">{current.tag}</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            {current.title}
          </h2>
          <p className="mt-4 text-slate-600">
            {current.desc}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {current.cards.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-slate-150 bg-slate-50/50 p-8 shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-md"
            >
              <div className="mb-4 text-3xl">{c.icon}</div>
              <h3 className="text-base font-bold text-slate-900">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
