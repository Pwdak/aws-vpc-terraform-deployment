const cidrPlan = [
  { name: "VPC", value: "Lab-vpc1", cidr: "10.2.0.0/16", detail: "Réseau racine — vpc-0ce4313e36c3c8a56" },
  { name: "Subnet public 1", value: "Lab-vpc1-public-subnet-1", cidr: "10.2.1.0/24", detail: "eu-west-1a" },
  { name: "Subnet public 2", value: "Lab-vpc1-public-subnet-2", cidr: "10.2.2.0/24", detail: "eu-west-1b" },
  { name: "Subnet privé 1", value: "Lab-vpc1-private-subnet-1", cidr: "10.2.3.0/24", detail: "eu-west-1a" },
  { name: "Subnet privé 2", value: "Lab-vpc1-private-subnet-2", cidr: "10.2.4.0/24", detail: "eu-west-1b" },
];

export default function Architecture() {
  return (
    <section id="architecture" className="bg-white py-24 border-t border-slate-100">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">Architecture réseau</p>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">Schéma de déploiement multi-AZ</h2>
          <p className="mt-4 text-slate-600">
            Le VPC <code className="rounded bg-slate-100 px-1.5 py-0.5 text-orange-700 font-mono">10.2.0.0/16</code> est
            réparti sur deux zones de disponibilité (eu-west-1a / eu-west-1b) afin d'assurer la résilience. Chaque
            AZ dispose d'un sous-réseau public et d'un sous-réseau privé, chacun associé à une table de routage
            dédiée.
          </p>
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
            <h3 className="mb-4 text-base font-bold text-slate-950">Plan d'adressage (CIDR)</h3>
            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Ressource</th>
                    <th className="px-4 py-3">Nom</th>
                    <th className="px-4 py-3">CIDR</th>
                    <th className="px-4 py-3">Zone</th>
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
            <h3 className="mb-4 text-base font-bold text-slate-950">Logique de flux de trafic</h3>
            <ul className="space-y-3">
              {[
                "Le trafic entrant depuis Internet traverse l'Internet Gateway (IGW) et atteint les sous-réseaux publics.",
                "Les ressources des sous-réseaux privés n'ont pas d'IP publique : elles sortent vers Internet via la NAT Gateway.",
                "La NAT Gateway est déployée dans un sous-réseau public et s'appuie sur une adresse IP Elastic fixe.",
                "Deux tables de routage distinctes dirigent le trafic 0.0.0.0/0 : l'une vers l'IGW (public), l'autre vers la NAT GW (privé).",
              ].map((text, i) => (
                <li key={i} className="flex gap-3 rounded-lg border border-slate-150 bg-slate-50 p-4 text-xs text-slate-600 leading-relaxed shadow-sm">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-600 text-[10px] font-bold text-white shadow-sm shadow-orange-200">
                    {i + 1}
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
