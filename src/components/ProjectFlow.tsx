import { useState } from "react";

type FlowItem = {
  key: string;
  badge: string;
  title: string;
  sub: string;
  desc: string;
  points: string[];
  color: string;
};

type ProjectFlowProps = {
  lang: "fr" | "en";
};

const flowData = {
  fr: [
    {
      key: "contexte",
      badge: "01",
      title: "Contexte (Situation)",
      sub: "L'état initial du réseau",
      color: "from-amber-500 to-amber-600 bg-amber-100 border-amber-200 text-amber-800",
      desc: "Un besoin crucial de concevoir une fondation réseau robuste, hautement disponible et sécurisée sur AWS pour héberger des workloads d'entreprise (applications web publiques et bases de données privées). Il fallait s'assurer qu'aucune configuration ne soit faite de manière désorganisée ou manuelle, afin d'éviter la dérive des configurations (Configuration Drift) et de respecter les standards de sécurité.",
      points: [
        "Nécessité d'isoler hermétiquement le trafic public (front-end) du trafic privé (back-end).",
        "Contrainte d'assurer une haute disponibilité répartie sur au moins deux zones de disponibilité.",
        "Volonté absolue de bannir le 'ClickOps' (actions manuelles dans la console AWS) pour privilégier l'auditabilité.",
      ],
    },
    {
      key: "objectifs",
      badge: "02",
      title: "Objectifs (Tâche)",
      sub: "Le cahier des charges et livrables",
      color: "from-blue-500 to-blue-600 bg-blue-100 border-blue-200 text-blue-800",
      desc: "Définir, planifier et automatiser l'intégralité du déploiement réseau dans la région eu-west-1 (Irlande) à l'aide de l'Infrastructure as Code (IaC). Les objectifs précis consistaient à :",
      points: [
        "Créer un VPC racine (10.2.0.0/16) avec le support DNS complet activé.",
        "Réaliser un découpage rigoureux en 4 sous-réseaux (2 publics et 2 privés).",
        "Assurer l'interconnexion extérieure via une Internet Gateway (IGW) pour la partie publique.",
        "Sécuriser la sortie Internet des sous-réseaux privés via une NAT Gateway à IP fixe (Elastic IP).",
      ],
    },
    {
      key: "actions",
      badge: "03",
      title: "Actions Menées (Action)",
      sub: "L'implémentation et le code",
      color: "from-orange-500 to-orange-600 bg-orange-100 border-orange-200 text-orange-800",
      desc: "Mise en œuvre d'une démarche d'automatisation rigoureuse en utilisant Terraform (HCL) pour modéliser le réseau. Les actions clés ont été :",
      points: [
        "Écriture de scripts Terraform déclaratifs et structurés (main.tf, routes.tf, variables.tf).",
        "Configuration de l'EIP et de la NAT Gateway avec gestion fine des dépendances pour éviter les blocages de création.",
        "Création de tables de routage distinctes avec routage vers l'IGW pour le public et vers la NAT Gateway pour le privé.",
        "Validation des plans d'exécution (terraform plan) avant déploiement (terraform apply) et vérification finale.",
      ],
    },
    {
      key: "resultats",
      badge: "04",
      title: "Résultats Obtenus (Résultat)",
      sub: "La validation et l'infrastructure livrée",
      color: "from-emerald-500 to-emerald-600 bg-emerald-100 border-emerald-200 text-emerald-800",
      desc: "Une infrastructure réseau 100% opérationnelle, hautement résiliente et reproductible en moins de 2 minutes. La réussite du déploiement a été démontrée par :",
      points: [
        "Déploiement sans erreur de 15 ressources cloud interconnectées sur AWS.",
        "Une cartographie réseau AWS visuellement parfaite (VPC → Subnets → Route Tables → IGW/NAT GW).",
        "Des serveurs privés capables de télécharger des mises à jour via la NAT Gateway tout en restant invisibles depuis Internet.",
        "Un réseau entièrement documenté sous forme de code, prêt à être détruit (terraform destroy) ou dupliqué à l'infini.",
      ],
    },
  ],
  en: [
    {
      key: "contexte",
      badge: "01",
      title: "Context (Situation)",
      sub: "Initial network state",
      color: "from-amber-500 to-amber-600 bg-amber-100 border-amber-200 text-amber-800",
      desc: "A crucial need to design a robust, highly available, and secure network foundation on AWS to host enterprise workloads (public web applications and private databases). It was critical to ensure that no configuration was done manually or in a disorganized fashion, to prevent configuration drift and respect high security standards.",
      points: [
        "Need to hermetically isolate public traffic (front-end) from private traffic (back-end).",
        "High availability constraint spread across at least two Availability Zones.",
        "Absolute commitment to ban 'ClickOps' (manual AWS console actions) in favor of auditability.",
      ],
    },
    {
      key: "objectifs",
      badge: "02",
      title: "Objectives (Task)",
      sub: "Requirements & Deliverables",
      color: "from-blue-500 to-blue-600 bg-blue-100 border-blue-200 text-blue-800",
      desc: "Define, plan, and automate the entire network deployment in the eu-west-1 (Ireland) region using Infrastructure as Code (IaC). Precise goals included:",
      points: [
        "Create a root VPC (10.2.0.0/16) with full DNS resolution support enabled.",
        "Strictly split the address space into 4 subnets (2 public and 2 private).",
        "Ensure external routing via an Internet Gateway (IGW) for the public segment.",
        "Secure outgoing internet traffic for private subnets using a NAT Gateway with a static IP (Elastic IP).",
      ],
    },
    {
      key: "actions",
      badge: "03",
      title: "Actions Taken (Action)",
      sub: "Implementation and code",
      color: "from-orange-500 to-orange-600 bg-orange-100 border-orange-200 text-orange-800",
      desc: "Implementation of a rigorous automation strategy using Terraform (HCL) to model the network. Key actions included:",
      points: [
        "Writing declarative and structured Terraform scripts (main.tf, routes.tf, variables.tf).",
        "Configuring the EIP and NAT Gateway with precise dependency management to avoid creation blockages.",
        "Creating separate route tables with routes pointing to the IGW for public and to the NAT Gateway for private subnets.",
        "Validating execution plans (terraform plan) prior to deployment (terraform apply) and final console checking.",
      ],
    },
    {
      key: "resultats",
      badge: "04",
      title: "Results Obtained (Result)",
      sub: "Validation and delivered infrastructure",
      color: "from-emerald-500 to-emerald-600 bg-emerald-100 border-emerald-200 text-emerald-800",
      desc: "A 100% operational, highly resilient, and reproducible network infrastructure ready in under 2 minutes. The success of the deployment is proved by:",
      points: [
        "Zero-error deployment of 15 interconnected cloud resources on AWS.",
        "A visually flawless AWS network resource map (VPC → Subnets → Route Tables → IGW/NAT GW).",
        "Private servers capable of downloading updates via the NAT Gateway while remaining completely hidden from the internet.",
        "A network fully documented as code, ready to be destroyed (terraform destroy) or cloned infinitely.",
      ],
    },
  ],
};

const headings = {
  fr: {
    tag: "Démarche d'ingénierie",
    title: "Déroulement logique du projet",
    desc: "Afin de présenter ce projet de manière claire et axée sur l'impact, voici la structure logique et chronologique de notre démarche : du contexte initial jusqu'aux résultats mesurables.",
    keypoints: "Points clés",
  },
  en: {
    tag: "Engineering Process",
    title: "Logical project workflow",
    desc: "To present this project clearly and highlight its impact, here is the logical and chronological structure of our approach: from the initial context to measurable results.",
    keypoints: "Key points",
  },
};

export default function ProjectFlow({ lang }: ProjectFlowProps) {
  const [activeTab, setActiveTab] = useState("contexte");
  const currentLangData = flowData[lang];
  const current: FlowItem = currentLangData.find((item) => item.key === activeTab) || currentLangData[0];
  const text = headings[lang];

  return (
    <section id="contexte" className="bg-slate-50 py-24 border-y border-slate-200">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">{text.tag}</p>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            {text.title}
          </h2>
          <p className="mt-4 text-slate-600">
            {text.desc}
          </p>
        </div>

        {/* Boutons d'onglets de la démarche logique */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {currentLangData.map((item) => {
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`relative flex items-center gap-4 rounded-xl border p-4 text-left transition-all ${
                  isActive
                    ? "border-orange-500 bg-white shadow-md shadow-orange-100/50 ring-1 ring-orange-500/10"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                }`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border font-extrabold shadow-sm ${item.color}`}
                >
                  {item.badge}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{item.title.split(" (")[0]}</h3>
                  <p className="text-[11px] text-slate-500 truncate max-w-[120px]">{item.sub}</p>
                </div>
                {isActive && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 border-8 border-transparent border-t-orange-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* Détail de l'onglet actif */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-4 lg:max-w-2xl">
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase ${current.color}`}>
                  {current.title}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-600">{current.desc}</p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-6 lg:w-96 shrink-0">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">{text.keypoints}</h4>
              <ul className="space-y-3">
                {current.points.map((pt, i) => (
                  <li key={i} className="flex gap-2.5 items-start text-xs text-slate-700 leading-relaxed">
                    <span className="text-orange-500 mt-0.5 shrink-0">✔</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
