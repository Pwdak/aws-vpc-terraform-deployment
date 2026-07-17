export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-orange-50/20 to-white pt-36 pb-24 text-slate-800">
      {/* Grille technique d'arrière-plan */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-100/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-orange-700">
          Projet Cloud &amp; Infrastructure as Code
        </div>
        <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Déploiement automatisé d'une infrastructure réseau <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">AWS VPC</span>
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
          Conception et provisioning d'un réseau privé virtuel (VPC) complet — sous-réseaux publics/privés,
          Internet Gateway, NAT Gateway, Elastic IP et tables de routage — entièrement automatisé avec
          <span className="font-semibold text-slate-900"> Terraform</span> sur la région AWS Europe (Irlande).
        </p>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { value: "1", label: "VPC — 10.2.0.0/16" },
            { value: "4", label: "Sous-réseaux" },
            { value: "2", label: "AZ (eu-west-1a/1b)" },
            { value: "100%", label: "Automatisé Terraform" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-100"
            >
              <p className="text-3xl font-extrabold text-orange-600">{stat.value}</p>
              <p className="mt-1 text-xs font-medium text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#contexte"
            className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800"
          >
            Découvrir le contexte
          </a>
          <a
            href="#architecture"
            className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-orange-500 hover:text-orange-600"
          >
            Voir l'architecture
          </a>
        </div>
      </div>
    </section>
  );
}
