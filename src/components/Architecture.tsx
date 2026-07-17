type ArchitectureProps = {
  lang: "fr" | "en";
};

const headings = {
  fr: {
    tag: "Architecture réseau",
    title: "Schéma de déploiement multi-AZ",
    desc: "Le VPC Lab-vpc1 (10.2.0.0/16) est réparti sur deux zones de disponibilité (eu-west-1a / eu-west-1b) afin d'assurer la résilience. Chaque AZ dispose d'un sous-réseau public et d'un sous-réseau privé, chacun associé à une table de routage dédiée.",
    tableTitle: "Plan d'adressage (CIDR)",
    cols: ["Ressource", "Nom", "CIDR", "Zone"],
    flowTitle: "Logique de flux de trafic",
    flows: [
      "Le trafic entrant depuis Internet traverse l'Internet Gateway (IGW) et atteint les sous-réseaux publics.",
      "Les ressources des sous-réseaux privés n'ont pas d'IP publique : elles sortent vers Internet via la NAT Gateway.",
      "La NAT Gateway est déployée dans un sous-réseau public et s'appuie sur une adresse IP Elastic fixe.",
      "Deux tables de routage distinctes dirigent le trafic 0.0.0.0/0 : l'une vers l'IGW (public), l'autre vers la NAT GW (privé).",
    ],
  },
  en: {
    tag: "Network Architecture",
    title: "Multi-AZ Deployment Schema",
    desc: "The Lab-vpc1 VPC (10.2.0.0/16) is distributed across two Availability Zones (eu-west-1a / eu-west-1b) to ensure resiliency. Each AZ features a public and a private subnet, each mapped to a dedicated route table.",
    tableTitle: "Address Space Plan (CIDR)",
    cols: ["Resource", "Name", "CIDR", "Zone"],
    flowTitle: "Traffic Flow Logic",
    flows: [
      "Incoming traffic from the internet crosses the Internet Gateway (IGW) to reach the public subnets.",
      "Private subnet resources have no public IP: they access the internet through the NAT Gateway.",
      "The NAT Gateway is deployed inside a public subnet and relies on a static Elastic IP.",
      "Two distinct route tables route 0.0.0.0/0 traffic: one to the IGW (public), the other to the NAT GW (private).",
    ],
  },
};

const cidrPlan = [
  { name: "VPC", value: "Lab-vpc1", cidr: "10.2.0.0/16", detail: "eu-west-1a / b" },
  { name: "Subnet public 1", value: "Lab-vpc1-public-subnet-1", cidr: "10.2.1.0/24", detail: "eu-west-1a" },
  { name: "Subnet public 2", value: "Lab-vpc1-public-subnet-2", cidr: "10.2.2.0/24", detail: "eu-west-1b" },
  { name: "Subnet privé 1", value: "Lab-vpc1-private-subnet-1", cidr: "10.2.3.0/24", detail: "eu-west-1a" },
  { name: "Subnet privé 2", value: "Lab-vpc1-private-subnet-2", cidr: "10.2.4.0/24", detail: "eu-west-1b" },
];

export default function Architecture({ lang }: ArchitectureProps) {
  const text = headings[lang];
  return (
    <section id="architecture" className="bg-white py-24 border-t border-slate-100">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">{text.tag}</p>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">{text.title}</h2>
          <p className="mt-4 text-slate-600">{text.desc}</p>
        </div>

        {/* Conteneur de l'image de diagramme d'architecture */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2 shadow-lg shadow-slate-100/50">
          <img
            src="/images/architecture-diagram.jpg"
            alt="Diagramme d'architecture du VPC avec IGW, NAT Gateway, subnets publics et privés"
            className="w-full object-contain rounded-xl"
          />
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h3 className="mb-4 text-base font-bold text-slate-950">{text.tableTitle}</h3>
            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 border-b border-slate-200">
                  <tr>
                    {text.cols.map((col) => (
                      <th key={col} className="px-4 py-3">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {cidrPlan.map((row) => (
                    <tr key={row.name} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-slate-800">{row.name}</td>
                      <td className="px-4 py-3 text-slate-500 text-xs">{row.value}</td>
                      <td className="px-4 py-3 font-mono text-orange-600 font-bold">{row.cidr}</td>
                      <td className="px-4 py-3 text-slate-500 text-xs">{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-4 text-base font-bold text-slate-950">{text.flowTitle}</h3>
            <ul className="space-y-3">
              {text.flows.map((flow, i) => (
                <li key={i} className="flex gap-3 rounded-lg border border-slate-150 bg-slate-50 p-4 text-xs text-slate-600 leading-relaxed shadow-sm">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-600 text-[10px] font-bold text-white shadow-sm shadow-orange-200">
                    {i + 1}
                  </span>
                  <span>{flow}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
