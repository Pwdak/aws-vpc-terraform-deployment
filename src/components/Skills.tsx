type SkillsProps = {
  lang: "fr" | "en";
};

const headings = {
  fr: {
    tag: "Compétences mobilisées",
    title: "Stack technique du projet",
    skills: [
      { name: "Amazon VPC", detail: "Conception d'un réseau segmenté et découpage CIDR", emoji: "🧱" },
      { name: "Internet Gateway", detail: "Connectivité Internet des sous-réseaux publics", emoji: "🌍" },
      { name: "NAT Gateway & EIP", detail: "Sortie Internet sécurisée pour les ressources privées", emoji: "🔁" },
      { name: "Route Tables", detail: "Routage explicite public/privé et associations", emoji: "🧭" },
      { name: "Terraform (HCL)", detail: "Provisioning déclaratif, variables, for_each, dépendances", emoji: "🛠️" },
      { name: "Infrastructure as Code", detail: "Versioning Git, plan/apply, idempotence, reproductibilité", emoji: "📦" },
      { name: "Multi-AZ Design", detail: "Haute disponibilité répartie sur deux zones de disponibilité", emoji: "🏗️" },
      { name: "AWS Console", detail: "Vérification, cartographie des ressources et diagnostics", emoji: "🖥️" },
    ],
  },
  en: {
    tag: "Mobilized Skills",
    title: "Project Technical Stack",
    skills: [
      { name: "Amazon VPC", detail: "Segmented network design and CIDR planning", emoji: "🧱" },
      { name: "Internet Gateway", detail: "Internet connectivity for public subnets", emoji: "🌍" },
      { name: "NAT Gateway & EIP", detail: "Secure outgoing internet for private workloads", emoji: "🔁" },
      { name: "Route Tables", detail: "Explicit public/private routing and mapping", emoji: "🧭" },
      { name: "Terraform (HCL)", detail: "Declarative provisioning, variables, loops, dependencies", emoji: "🛠️" },
      { name: "Infrastructure as Code", detail: "Git versioning, plan/apply, idempotency, repeatability", emoji: "📦" },
      { name: "Multi-AZ Design", detail: "High availability distributed across multiple Availability Zones", emoji: "🏗️" },
      { name: "AWS Console", detail: "Resource mapping verification and diagnostic tools", emoji: "🖥️" },
    ],
  },
};

export default function Skills({ lang }: SkillsProps) {
  const text = headings[lang];
  return (
    <section id="competences" className="bg-slate-50 py-24 border-t border-slate-100">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">{text.tag}</p>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">{text.title}</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {text.skills.map((s) => (
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
