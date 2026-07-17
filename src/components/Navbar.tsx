import { useEffect, useState } from "react";

const links = [
  { href: "#contexte", label: "Contexte" },
  { href: "#objectifs", label: "Objectifs" },
  { href: "#architecture", label: "Architecture" },
  { href: "#deploiement", label: "Déploiement" },
  { href: "#terraform", label: "Automatisation IaC" },
  { href: "#configurations", label: "Configurations" },
  { href: "#competences", label: "Compétences" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white/95 shadow-md shadow-slate-100/50 backdrop-blur border-b border-slate-150" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 font-bold text-white shadow-sm">
            λ
          </span>
          <span className="text-sm font-semibold tracking-wide text-slate-800">
            Lab-VPC1 <span className="text-orange-600 font-medium">| AWS × Terraform</span>
          </span>
        </a>
        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
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
        <a
          href="#terraform"
          className="hidden rounded-full border border-orange-500/50 px-4 py-2 text-xs font-semibold text-orange-600 transition hover:bg-orange-500 hover:text-white md:inline-block"
        >
          Voir le code IaC
        </a>
      </nav>
    </header>
  );
}
