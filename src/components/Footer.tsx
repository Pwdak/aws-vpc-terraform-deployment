export default function Footer() {
  return (
    <footer className="bg-white py-12 border-t border-slate-200 text-slate-500">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-sm font-bold text-white shadow-sm">
            λ
          </span>
          <p className="text-sm text-slate-600 font-medium">
            Portfolio technique — Déploiement AWS VPC automatisé avec Terraform (STAR)
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-medium text-slate-600">AWS eu-west-1</span>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-medium text-slate-600">Terraform IaC</span>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-medium text-slate-600">Méthode STAR</span>
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} — Réalisé avec rigueur et clarté à des fins de portfolio technique.
      </p>
    </footer>
  );
}
