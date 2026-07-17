type TerraformSectionProps = {
  lang: "fr" | "en";
};

const headings = {
  fr: {
    tag: "Automatisation IaC",
    title: "Le déploiement par le code (Terraform)",
    desc: "Afin d'éviter toute dérive de configuration (le redoutable « Configuration Drift ») et de pouvoir reproduire l'intégralité du réseau à l'infini en un clic, le projet a été développé de manière purement déclarative. C'est l'essence même de l'étape Action de notre méthodologie.",
    workflow: "Workflow d'Exécution CLI",
    terminalDesc: "Le Résultat en console : 15 ressources créées de manière atomique (VPC, 4 sous-réseaux, EIP, NAT Gateway, Internet Gateway, 2 tables de routage et 4 associations de sous-réseaux).",
    steps: [
      { cmd: "terraform init", desc: "Initialise le répertoire de travail, télécharge le fournisseur AWS et configure le backend d'état." },
      { cmd: "terraform fmt && terraform validate", desc: "Formate et valide la syntaxe et la cohérence sémantique des fichiers .tf avant exécution." },
      { cmd: "terraform plan -out=plan.out", desc: "Calcule l'ordre de déploiement et montre à l'avance les 15 ressources qui vont être créées sans altérer AWS." },
      { cmd: "terraform apply plan.out", desc: "Provisionne réellement les ressources sur la console AWS de manière transactionnelle." },
      { cmd: "terraform output", desc: "Permet de récupérer les variables d'état (VPC ID, NAT Gateway IP) pour d'autres modules ou pipelines." },
    ],
  },
  en: {
    tag: "IaC Automation",
    title: "Deployment through Code (Terraform)",
    desc: "To prevent configuration drift and allow infinite, click-of-a-button replication of the entire network, the project was developed declaratively. This is the cornerstone of the Action phase in our engineering methodology.",
    workflow: "CLI Execution Workflow",
    terminalDesc: "Console Output: 15 resources created atomically (VPC, 4 subnets, EIP, NAT Gateway, Internet Gateway, 2 route tables, and 4 subnet associations).",
    steps: [
      { cmd: "terraform init", desc: "Initializes the working directory, downloads the AWS provider, and configures the backend state." },
      { cmd: "terraform fmt && terraform validate", desc: "Formats and validates syntax and semantic consistency of the .tf files prior to execution." },
      { cmd: "terraform plan -out=plan.out", desc: "Computes the deployment graph and previews the 15 resources to be created without modifying AWS." },
      { cmd: "terraform apply plan.out", desc: "Actually provisions resources on the live AWS console in a transactional manner." },
      { cmd: "terraform output", desc: "Retrieves output variables (VPC ID, NAT Gateway IP) for downstream modules or CI/CD pipelines." },
    ],
  },
};

const mainTf = `# main.tf — AWS Network Foundation

resource "aws_vpc" "lab_vpc" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = { Name = "Lab-vpc1" }
}

resource "aws_subnet" "public" {
  for_each                = var.public_subnets
  vpc_id                  = aws_vpc.lab_vpc.id
  cidr_block              = each.value.cidr
  availability_zone       = each.value.az
  map_public_ip_on_launch = true

  tags = { Name = "Lab-vpc1-public-\${each.key}" }
}

resource "aws_subnet" "private" {
  for_each          = var.private_subnets
  vpc_id            = aws_vpc.lab_vpc.id
  cidr_block        = each.value.cidr
  availability_zone = each.value.az

  tags = { Name = "Lab-vpc1-private-\${each.key}" }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.lab_vpc.id
  tags   = { Name = "Lab-vpc1-igw" }
}

resource "aws_eip" "nat_eip" {
  domain     = "vpc"
  depends_on = [aws_internet_gateway.igw]
}

resource "aws_nat_gateway" "nat" {
  allocation_id = aws_eip.nat_eip.id
  subnet_id     = aws_subnet.public["subnet-1"].id
  depends_on    = [aws_internet_gateway.igw]

  tags = { Name = "Lab-vpc1-nat-gw" }
}`;

const routesTf = `# routes.tf — Route Tables

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.lab_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = { Name = "Lab-vpc1-public-rt" }
}

resource "aws_route_table" "private" {
  vpc_id = aws_vpc.lab_vpc.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat.id
  }

  tags = { Name = "Lab-vpc1-private-rt" }
}

resource "aws_route_table_association" "public" {
  for_each       = aws_subnet.public
  subnet_id      = each.value.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "private" {
  for_each       = aws_subnet.private
  subnet_id      = each.value.id
  route_table_id = aws_route_table.private.id
}`;

export default function TerraformSection({ lang }: TerraformSectionProps) {
  const text = headings[lang];
  return (
    <section id="terraform" className="bg-slate-50 py-24 border-t border-slate-100">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">{text.tag}</p>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">{text.title}</h2>
          <p className="mt-4 text-slate-600">{text.desc}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[#0b1120] shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400/70" />
                <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
                <span className="h-3 w-3 rounded-full bg-green-400/70" />
                <span className="ml-3 text-xs font-medium text-slate-400">main.tf</span>
              </div>
              <span className="rounded bg-orange-500/10 px-2 py-0.5 text-[10px] font-bold text-orange-400 uppercase">VPC &amp; Gateways</span>
            </div>
            <pre className="max-h-[380px] overflow-auto p-5 text-[11px] leading-relaxed text-emerald-400 font-mono">
              <code>{mainTf}</code>
            </pre>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[#0b1120] shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400/70" />
                <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
                <span className="h-3 w-3 rounded-full bg-green-400/70" />
                <span className="ml-3 text-xs font-medium text-slate-400">routes.tf</span>
              </div>
              <span className="rounded bg-orange-500/10 px-2 py-0.5 text-[10px] font-bold text-orange-400 uppercase">Routing</span>
            </div>
            <pre className="max-h-[380px] overflow-auto p-5 text-[11px] leading-relaxed text-emerald-400 font-mono">
              <code>{routesTf}</code>
            </pre>
          </div>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h3 className="mb-4 text-base font-bold text-slate-900">{text.workflow}</h3>
            <ol className="space-y-3">
              {text.steps.map((s, i) => (
                <li key={s.cmd} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-xs font-bold text-orange-600">
                    {i + 1}
                  </span>
                  <div>
                    <code className="rounded bg-slate-100 px-2 py-1 text-[11px] font-bold text-orange-600 font-mono border border-slate-200">{s.cmd}</code>
                    <p className="mt-2 text-xs text-slate-500">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 p-1 shadow-sm">
              <img
                src="/images/terraform-terminal.jpg"
                alt="Terminal exécutant terraform apply avec la liste des ressources créées"
                className="w-full object-cover rounded-xl"
              />
            </div>
            <p className="mt-3 text-xs text-slate-500 leading-relaxed">
              <strong>{text.terminalDesc}</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
