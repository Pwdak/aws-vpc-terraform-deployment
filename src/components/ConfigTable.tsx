const groups = [
  {
    title: "VPC",
    icon: "🌐",
    rows: [
      ["Nom", "Lab-vpc1"],
      ["ID", "vpc-0ce4313e36c3c8a56"],
      ["CIDR IPv4", "10.2.0.0/16"],
      ["CIDR IPv6", "Non attribué"],
      ["DNS hostnames / support", "Activés"],
      ["Contrôle de chiffrement VPC", "Désactivé"],
      ["Région", "eu-west-1 (Europe - Irlande)"],
    ],
  },
  {
    title: "Sous-réseaux",
    icon: "🧩",
    rows: [
      ["Lab-vpc1-public-subnet-1", "10.2.1.0/24 — eu-west-1a — IP publique auto"],
      ["Lab-vpc1-public-subnet-2", "10.2.2.0/24 — eu-west-1b — IP publique auto"],
      ["Lab-vpc1-private-subnet-1", "10.2.3.0/24 — eu-west-1a — pas d'IP publique"],
      ["Lab-vpc1-private-subnet-2", "10.2.4.0/24 — eu-west-1b — pas d'IP publique"],
    ],
  },
  {
    title: "Internet Gateway",
    icon: "🚪",
    rows: [
      ["Nom", "Lab-vpc1-igw"],
      ["ID", "igw-0862c36420d2634b4"],
      ["Attachement", "Lab-vpc1 (vpc-0ce4313e36c3c8a56)"],
      ["Rôle", "Point de sortie/entrée Internet des sous-réseaux publics"],
    ],
  },
  {
    title: "Elastic IP & NAT Gateway",
    icon: "🛰️",
    rows: [
      ["EIP — Adresse publique", "34.250.237.153"],
      ["EIP — ID d'allocation", "eipalloc-0ab3f711c56b2fc33"],
      ["NAT Gateway — Nom", "Lab-vpc1-nat-gw"],
      ["NAT Gateway — ID", "nat-0af6cc5dcbe178827"],
      ["Type / Distribution", "Public — Zonal"],
      ["Sous-réseau hôte", "Lab-vpc1-public-subnet-1"],
      ["État", "Available"],
    ],
  },
  {
    title: "Table de routage — Publique",
    icon: "🛣️",
    rows: [
      ["ID", "rtb-0a966c24ccdbd3f9f"],
      ["Route locale", "10.2.0.0/16 → local"],
      ["Route par défaut", "0.0.0.0/0 → igw-0862c36420d2634b4"],
      ["Associations", "public-subnet-1, public-subnet-2"],
    ],
  },
  {
    title: "Table de routage — Privée",
    icon: "🔒",
    rows: [
      ["ID", "rtb-0b4a02d9bf8900771"],
      ["Route locale", "10.2.0.0/16 → local"],
      ["Route par défaut", "0.0.0.0/0 → nat-0af6cc5dcbe178827"],
      ["Associations", "private-subnet-1, private-subnet-2"],
    ],
  },
];

export default function ConfigTable() {
  return (
    <section id="configurations" className="bg-slate-50 py-24 border-t border-slate-100">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">Récapitulatif technique</p>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">Détail de toutes les configurations</h2>
          <p className="mt-4 text-slate-600">
            Synthèse exhaustive de l'ensemble des configurations réseau telles que déployées de manière autonome et stable sur AWS.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {groups.map((g) => (
            <div key={g.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-slate-300 hover:shadow-md transition-all">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-extrabold text-slate-900">
                <span className="text-lg">{g.icon}</span>
                {g.title}
              </h3>
              <dl className="divide-y divide-slate-100">
                {g.rows.map(([label, value]) => (
                  <div key={label} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</dt>
                    <dd className="break-all text-left font-mono text-xs font-semibold text-slate-700 sm:text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
