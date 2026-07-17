const skills = [
  { name: "Amazon VPC", detail: "Conception d'un réseau segmenté et découpage CIDR", emoji: "🧱" },
  { name: "Internet Gateway", detail: "Connectivité Internet des sous-réseaux publics", emoji: "🌍" },
  { name: "NAT Gateway & Elastic IP", detail: "Sortie Internet sécurisée pour les ressources privées", emoji: "🔁" },
  { name: "Route Tables", detail: "Routage explicite public/privé et associations de sous-réseaux", emoji: "🧭" },
  { name: "Terraform (HCL)", detail: "Provisioning déclaratif, variables, for_each, dépendances", emoji: "🛠️" },
  { name: "Infrastructure as Code", detail: "Versioning Git, plan/apply, idempotence, reproductibilité", emoji: "📦" },
  { name: "Multi-AZ Design", detail: "Haute disponibilité sur deux zones de disponibilité", emoji: "🏗️" },
  { name: "AWS Console", detail: "Vérification, cartographie des ressources et diagnostic réseau", emoji: "🖥️" },
];

export default function Skills() {
  return (
    <section id="competences" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">Compétences mobilisées</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Stack technique du projet</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((s) => (
            <div
              key={s.name}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg"
            >
              <div className="text-2xl">{s.emoji}</div>
              <h3 className="mt-3 text-sm font-bold text-slate-900">{s.name}</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">{s.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
