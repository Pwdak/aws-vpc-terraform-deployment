type NavbarProps = {
  lang: "fr" | "en";
  setLang: (lang: "fr" | "en") => void;
};

const links = {
  fr: [
    { href: "#contexte", label: "Contexte" },
    { href: "#architecture", label: "Architecture" },
    { href: "#deploiement", label: "Déploiement" },
    { href: "#terraform", label: "Automatisation IaC" },
    { href: "#configurations", label: "Configurations" },
    { href: "#competences", label: "Compétences" },
  ],
  en: [
    { href: "#contexte", label: "Context" },
    { href: "#architecture", label: "Architecture" },
    { href: "#deploiement", label: "Deployment" },
    { href: "#terraform", label: "IaC Automation" },
    { href: "#configurations", label: "Configurations" },
    { href: "#competences", label: "Skills" },
  ],
};

export default function Navbar({ lang, setLang }: NavbarProps) {
  return (
    <header className="fixed top-0 z-50 w-full bg-white/95 shadow-md shadow-slate-100/50 backdrop-blur border-b border-slate-150">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 font-bold text-white shadow-sm">
            λ
          </span>
          <span className="text-sm font-semibold tracking-wide text-slate-800">
            Lab-VPC1 <span className="text-orange-600 font-medium">| AWS × Terraform</span>
          </span>
        </a>

        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-7 md:flex">
            {links[lang].map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm font-medium text-slate-600 transition hover:text-orange-600"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 border-l border-slate-250 pl-6">
            <button
              onClick={() => setLang("fr")}
              className={`rounded px-2 py-1 text-xs font-bold transition-all ${
                lang === "fr" ? "bg-orange-500 text-white" : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              FR
            </button>
            <button
              onClick={() => setLang("en")}
              className={`rounded px-2 py-1 text-xs font-bold transition-all ${
                lang === "en" ? "bg-orange-500 text-white" : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
