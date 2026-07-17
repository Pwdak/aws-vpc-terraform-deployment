type FooterProps = {
  lang: "fr" | "en";
};

const texts = {
  fr: {
    text: "Portfolio technique — Déploiement AWS VPC automatisé avec Terraform",
    badge1: "AWS eu-west-1",
    badge2: "Terraform",
    badge3: "Infrastructure as Code",
    copyright: "Projet de démonstration réseau cloud. Réalisé à des fins pédagogiques.",
  },
  en: {
    text: "Technical Portfolio — Automated AWS VPC Deployment with Terraform",
    badge1: "AWS eu-west-1",
    badge2: "Terraform",
    badge3: "Infrastructure as Code",
    copyright: "Cloud network demonstration project. Created for pedagogical purposes.",
  },
};

export default function Footer({ lang }: FooterProps) {
  const current = texts[lang];
  return (
    <footer className="bg-white py-12 border-t border-slate-200 text-slate-500">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-sm font-bold text-white shadow-sm">
            λ
          </span>
          <p className="text-sm text-slate-600 font-medium">
            {current.text}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-medium text-slate-600">{current.badge1}</span>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-medium text-slate-600">{current.badge2}</span>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-medium text-slate-600">{current.badge3}</span>
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-slate-400 font-medium">
        © {new Date().getFullYear()} — {current.copyright}
      </p>
    </footer>
  );
}
