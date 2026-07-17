type Step = {
  n: string;
  title: string;
  phase: "Contexte" | "Objectif" | "Action" | "Résultat";
  phaseColor: string;
  description: string;
  image?: string;
  imageAlt?: string;
  details: { label: string; value: string }[];
};

const steps: Step[] = [
  {
    n: "01",
    title: "Planification du plan d'adressage",
    phase: "Contexte",
    phaseColor: "bg-amber-100 text-amber-800 border-amber-200",
    description:
      "Analyse du besoin et conception de la topologie réseau. Choix du bloc CIDR global et de sa segmentation en sous-réseaux pour héberger des ressources distinctes de manière sécurisée (public/privé).",
    details: [
      { label: "Région", value: "eu-west-1 (Europe - Irlande)" },
      { label: "CIDR VPC", value: "10.2.0.0/16" },
      { label: "Zones de disponibilité", value: "eu-west-1a, eu-west-1b" },
    ],
  },
  {
    n: "02",
    title: "Définition des cibles d'interconnexion",
    phase: "Objectif",
    phaseColor: "bg-blue-100 text-blue-800 border-blue-200",
    description:
      "Ciblage des ressources AWS nécessaires pour former notre infrastructure cible. Établissement des dépendances et de la structure globale du projet de code Terraform (HCL).",
    details: [
      { label: "Outil de déploiement", value: "Terraform v1.5+" },
      { label: "Objectif de ressources", value: "15 ressources interconnectées" },
      { label: "Méthode", value: "Déclarative, centralisée dans un état local" },
    ],
  },
  {
    n: "03",
    title: "Création du VPC",
    phase: "Action",
    phaseColor: "bg-orange-100 text-orange-800 border-orange-200",
    description:
      "Provisioning de la ressource aws_vpc via Terraform : le VPC « Lab-vpc1 » est créé avec le support DNS activé (enable_dns_support et enable_dns_hostnames) afin de permettre la résolution de noms pour les instances internes.",
    details: [
      { label: "Nom", value: "Lab-vpc1" },
      { label: "ID VPC", value: "vpc-0ce4313e36c3c8a56" },
      { label: "CIDR IPv4", value: "10.2.0.0/16" },
      { label: "État", value: "Available" },
    ],
  },
  {
    n: "04",
    title: "Déploiement des sous-réseaux publics et privés",
    phase: "Action",
    phaseColor: "bg-orange-100 text-orange-800 border-orange-200",
    description:
      "Quatre sous-réseaux sont créés via une ressource aws_subnet itérée : deux publics (map_public_ip_on_launch = true) et deux privés, répartis sur les deux AZ pour garantir la redondance et la haute disponibilité.",
    image: "/images/console-subnets.jpg",
    imageAlt: "Liste des sous-réseaux publics et privés dans la console AWS",
    details: [
      { label: "public-subnet-1", value: "10.2.1.0/24 — eu-west-1a" },
      { label: "public-subnet-2", value: "10.2.2.0/24 — eu-west-1b" },
      { label: "private-subnet-1", value: "10.2.3.0/24 — eu-west-1a" },
      { label: "private-subnet-2", value: "10.2.4.0/24 — eu-west-1b" },
    ],
  },
  {
    n: "05",
    title: "Création et attachement de l'Internet Gateway",
    phase: "Action",
    phaseColor: "bg-orange-100 text-orange-800 border-orange-200",
    description:
      "Une passerelle Internet (aws_internet_gateway) est créée puis attachée au VPC. Elle constitue le point d'entrée/sortie du trafic Internet pour les sous-réseaux publics.",
    details: [
      { label: "Nom", value: "Lab-vpc1-igw" },
      { label: "ID", value: "igw-0862c36420d2634b4" },
      { label: "Attaché à", value: "vpc-0ce4313e36c3c8a56 (Lab-vpc1)" },
    ],
  },
  {
    n: "06",
    title: "Allocation d'une adresse IP Elastic",
    phase: "Action",
    phaseColor: "bg-orange-100 text-orange-800 border-orange-200",
    description:
      "Une adresse IP Elastic (aws_eip) est allouée dans le domaine VPC. Elle sera rattachée à la NAT Gateway afin de lui fournir une adresse IP publique fixe, indispensable pour le trafic sortant des sous-réseaux privés.",
    image: "/images/console-eip.jpg",
    imageAlt: "Adresse IP Elastic allouée dans la console AWS",
    details: [
      { label: "Adresse IPv4 publique", value: "34.250.237.153" },
      { label: "ID d'allocation", value: "eipalloc-0ab3f711c56b2fc33" },
      { label: "Adresse IP privée associée", value: "10.2.1.184" },
    ],
  },
  {
    n: "07",
    title: "Déploiement de la NAT Gateway",
    phase: "Action",
    phaseColor: "bg-orange-100 text-orange-800 border-orange-200",
    description:
      "La ressource aws_nat_gateway est déployée dans le sous-réseau public 1 (eu-west-1a) et associée à l'Elastic IP. Terraform gère la dépendance implicite via depends_on sur l'Internet Gateway.",
    image: "/images/console-natgw.jpg",
    imageAlt: "Passerelle NAT disponible dans la console AWS",
    details: [
      { label: "Nom", value: "Lab-vpc1-nat-gw" },
      { label: "ID", value: "nat-0af6cc5dcbe178827" },
      { label: "Type de connectivité", value: "Public — mode de distribution Zonal" },
      { label: "État", value: "Available" },
    ],
  },
  {
    n: "08",
    title: "Configuration des tables de routage",
    phase: "Action",
    phaseColor: "bg-orange-100 text-orange-800 border-orange-200",
    description:
      "Deux tables de routage sont créées : une table publique dont la route par défaut (0.0.0.0/0) pointe vers l'Internet Gateway, et une table privée dont la route par défaut pointe vers la NAT Gateway.",
    image: "/images/console-routes.jpg",
    imageAlt: "Table de routage privée avec route par défaut vers la NAT Gateway",
    details: [
      { label: "Lab-vpc1-public-rt", value: "0.0.0.0/0 → igw-0862c36420d2634b4" },
      { label: "Lab-vpc1-private-rt", value: "0.0.0.0/0 → nat-0af6cc5dcbe178827" },
      { label: "Route locale (les deux)", value: "10.2.0.0/16 → local" },
    ],
  },
  {
    n: "09",
    title: "Validation et Cartographie Finale",
    phase: "Résultat",
    phaseColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    description:
      "La console AWS génère automatiquement la cartographie des ressources du VPC, confirmant la cohérence de l'architecture et la réussite de la livraison globale.",
    image: "/images/console-vpc-map.jpg",
    imageAlt: "Cartographie automatique des ressources du VPC dans la console AWS",
    details: [
      { label: "Sous-réseaux", value: "4" },
      { label: "Tables de routage", value: "3 (dont 1 par défaut)" },
      { label: "Connexions réseau", value: "2 (Internet Gateway + NAT Gateway)" },
    ],
  },
];

export default function StepTimeline() {
  return (
    <section id="deploiement" className="bg-slate-50 py-24 border-t border-slate-100">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">Déroulé technique</p>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Étapes du déploiement technique
          </h2>
          <p className="mt-4 text-slate-600">
            Retracez les actions d'implémentation logique de l'infrastructure, corrélées aux phases de notre cahier des charges.
          </p>
        </div>

        <div className="relative space-y-12 border-l border-slate-200 pl-8 sm:pl-10">
          {steps.map((step) => (
            <div key={step.n} className="relative">
              {/* Point de l'axe de la frise */}
              <span className="absolute -left-[41px] top-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-white border border-slate-300 text-xs font-bold text-slate-600 shadow-sm sm:-left-[49px]">
                {step.n}
              </span>

              <div className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md lg:grid-cols-5 lg:p-8">
                <div className={step.image ? "lg:col-span-3" : "lg:col-span-5"}>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${step.phaseColor}`}>
                      {step.phase}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">{step.description}</p>

                  <dl className="mt-4 grid gap-2 sm:grid-cols-2">
                    {step.details.map((d) => (
                      <div key={d.label} className="rounded-lg bg-slate-50/50 border border-slate-100 px-3 py-2">
                        <dt className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                          {d.label}
                        </dt>
                        <dd className="mt-0.5 break-all font-mono text-[11px] font-medium text-slate-700">{d.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {step.image && (
                  <div className="lg:col-span-2">
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-1 shadow-sm">
                      <img src={step.image} alt={step.imageAlt} className="w-full object-cover rounded-lg" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
