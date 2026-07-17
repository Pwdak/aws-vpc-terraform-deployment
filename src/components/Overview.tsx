const cards = [
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
    icon: "👁️‍🗨️",
  },
];

export default function Overview() {
  return (
    <section id="apercu" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">Philosophie du projet</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Une architecture réseau robuste, pensée pour la sécurité et l'agilité
          </h2>
          <p className="mt-4 text-slate-600">
            En s'appuyant sur l'Infrastructure as Code, ce lab démontre l'excellence opérationnelle requise dans
            les environnements cloud professionnels.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
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
