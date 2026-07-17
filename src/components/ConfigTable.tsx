type ConfigTableProps = {
  lang: "fr" | "en";
};

const headings = {
  fr: {
    tag: "Récapitulatif technique",
    title: "Détail de toutes les configurations",
    desc: "Synthèse exhaustive de l'ensemble des configurations réseau telles que déployées de manière autonome et stable sur AWS.",
  },
  en: {
    tag: "Technical Summary",
    title: "All Configurations Details",
    desc: "Exhaustive synthesis of all network configurations as deployed autonomously and stably on AWS.",
  },
};

const getGroups = (lang: "fr" | "en") => [
  {
    title: "VPC",
    icon: "🌐",
    rows: [
      [lang === "fr" ? "Nom" : "Name", "Lab-vpc1"],
      ["ID", "vpc-0ce4313e36c3c8a56"],
      ["CIDR IPv4", "10.2.0.0/16"],
      ["CIDR IPv6", lang === "fr" ? "Non attribué" : "Unassigned"],
      ["DNS hostnames", lang === "fr" ? "Activés" : "Enabled"],
      [lang === "fr" ? "Région" : "Region", "eu-west-1 (Ireland)"],
    ],
  },
  {
    title: lang === "fr" ? "Sous-réseaux" : "Subnets",
    icon: "🧩",
    rows: [
      ["Lab-vpc1-public-subnet-1", "10.2.1.0/24 — eu-west-1a — Public IP auto"],
      ["Lab-vpc1-public-subnet-2", "10.2.2.0/24 — eu-west-1b — Public IP auto"],
      ["Lab-vpc1-private-subnet-1", "10.2.3.0/24 — eu-west-1a — Private only"],
      ["Lab-vpc1-private-subnet-2", "10.2.4.0/24 — eu-west-1b — Private only"],
    ],
  },
  {
    title: "Internet Gateway",
    icon: "🚪",
    rows: [
      [lang === "fr" ? "Nom" : "Name", "Lab-vpc1-igw"],
      ["ID", "igw-0862c36420d2634b4"],
      [lang === "fr" ? "Attachement" : "Attachment", "Lab-vpc1 (vpc-0ce4313e36c3c8a56)"],
      [lang === "fr" ? "Rôle" : "Role", lang === "fr" ? "Point de sortie/entrée Internet" : "Inbound/outbound Internet gateway"],
    ],
  },
  {
    title: "Elastic IP & NAT Gateway",
    icon: "🛰️",
    rows: [
      ["EIP — " + (lang === "fr" ? "Adresse publique" : "Public IP"), "34.250.237.153"],
      ["EIP — " + (lang === "fr" ? "ID d'allocation" : "Allocation ID"), "eipalloc-0ab3f711c56b2fc33"],
      ["NAT Gateway — " + (lang === "fr" ? "Nom" : "Name"), "Lab-vpc1-nat-gw"],
      ["NAT Gateway — ID", "nat-0af6cc5dcbe178827"],
      ["Type / Distribution", "Public — Zonal"],
      [lang === "fr" ? "Sous-réseau hôte" : "Host Subnet", "Lab-vpc1-public-subnet-1"],
      [lang === "fr" ? "État" : "State", "Available"],
    ],
  },
  {
    title: lang === "fr" ? "Table de routage — Publique" : "Route Table — Public",
    icon: "🛣️",
    rows: [
      ["ID", "rtb-0a966c24ccdbd3f9f"],
      [lang === "fr" ? "Route locale" : "Local Route", "10.2.0.0/16 → local"],
      [lang === "fr" ? "Route par défaut" : "Default Route", "0.0.0.0/0 → igw-0862c36420d2634b4"],
      ["Associations", "public-subnet-1, public-subnet-2"],
    ],
  },
  {
    title: lang === "fr" ? "Table de routage — Privée" : "Route Table — Private",
    icon: "🔒",
    rows: [
      ["ID", "rtb-0b4a02d9bf8900771"],
      [lang === "fr" ? "Route locale" : "Local Route", "10.2.0.0/16 → local"],
      [lang === "fr" ? "Route par défaut" : "Default Route", "0.0.0.0/0 → nat-0af6cc5dcbe178827"],
      ["Associations", "private-subnet-1, private-subnet-2"],
    ],
  },
];

export default function ConfigTable({ lang }: ConfigTableProps) {
  const text = headings[lang];
  const groups = getGroups(lang);

  return (
    <section id="configurations" className="bg-slate-50 py-24 border-t border-slate-100">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">{text.tag}</p>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">{text.title}</h2>
          <p className="mt-4 text-slate-600">{text.desc}</p>
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
