# Déploiement AWS VPC automatisé avec Terraform (Lab-VPC1)

Ce projet présente le déploiement de bout en bout d'une infrastructure réseau hautement disponible et sécurisée sur Amazon Web Services (AWS) dans la région `eu-west-1` (Europe - Irlande). L'intégralité de la configuration est automatisée à l'aide de Terraform (Infrastructure as Code).

## 📊 Architecture Réseau

L'architecture s'appuie sur un plan d'adressage IP robuste et segmenté pour isoler les ressources de manière optimale.

- **VPC** : `Lab-vpc1` (CIDR : `10.2.0.0/16`)
- **Zones de disponibilité (AZ)** : `eu-west-1a` et `eu-west-1b`
- **Sous-réseaux publics** :
  - `Lab-vpc1-public-subnet-1` (`10.2.1.0/24`) — zone `eu-west-1a` (héberge la NAT Gateway)
  - `Lab-vpc1-public-subnet-2` (`10.2.2.0/24`) — zone `eu-west-1b`
- **Sous-réseaux privés** :
  - `Lab-vpc1-private-subnet-1` (`10.2.3.0/24`) — zone `eu-west-1a`
  - `Lab-vpc1-private-subnet-2` (`10.2.4.0/24`) — zone `eu-west-1b`
- **Passerelles** :
  - **Internet Gateway (IGW)** : Point d'entrée et de sortie Internet pour les sous-réseaux publics.
  - **NAT Gateway (avec Elastic IP)** : Permet aux serveurs privés d'accéder de manière sécurisée à Internet pour les mises à jour sans être accessibles depuis l'extérieur.

---

## 🧭 Démarche et Organisation Logique du Projet

La réalisation de ce projet s'est articulée autour de quatre piliers fondamentaux :

### 1. Contexte (Situation)
La nécessité de concevoir de zéro une fondation réseau AWS solide et sécurisée pour héberger des applications Web modernes. L'un des principaux défis consistait à isoler le trafic public (front-end) du trafic privé (back-end et bases de données), tout en assurant une haute disponibilité (multi-AZ) et en évitant les configurations manuelles instables dans la console AWS (bannissement du "ClickOps").

### 2. Objectifs (Tâche)
La planification, le dimensionnement des sous-réseaux et la modélisation complète de l'architecture. Le cahier des charges comprenait :
- La création du VPC racine avec résolution DNS.
- La division en 4 sous-réseaux (2 publics, 2 privés) sur deux AZ.
- L'attribution d'une IP fixe publique (Elastic IP) dédiée à une NAT Gateway.
- L'isolation stricte des routes réseau pour interdire tout accès entrant non sollicité vers les instances privées.

### 3. Actions Menées (Action)
Le développement et l'implémentation de la solution réseau via l'Infrastructure as Code (IaC) :
- Écriture de scripts Terraform déclaratifs (`main.tf`, `routes.tf`, `variables.tf`).
- Gestion fine des dépendances implicites (utilisation de `depends_on` pour garantir que la NAT Gateway ne soit provisionnée qu'après la mise à disposition de l'Internet Gateway).
- Création de tables de routage séparées pour le trafic public (vers l'IGW) et le trafic privé (vers la NAT Gateway).
- Validation rigoureuse par les commandes `terraform plan` et déploiement via `terraform apply`.

### 4. Résultats Obtenus (Résultat)
Une infrastructure réseau 100 % opérationnelle, documentée, auditable et reproductible en moins de 2 minutes :
- Déploiement sans erreur de 15 ressources cloud interconnectées sur AWS.
- Cartographie visuelle et validation fonctionnelle impeccables au sein de la console AWS.
- Les flux sortants fonctionnent parfaitement pour les composants privés, sans exposition à Internet.
- Possibilité de détruire (`terraform destroy`) ou de cloner l'environnement complet (Staging/Production) à l'infini en conservant une cohérence absolue.

---

## 🛠️ Utilisation de Terraform

### Prérequis
- [Terraform CLI](https://developer.hashicorp.com/terraform/downloads) installé localement.
- Un compte AWS avec des identifiants configurés dans vos variables d'environnement (`AWS_ACCESS_KEY_ID` et `AWS_SECRET_ACCESS_KEY`).

### Commandes d'exécution
1. **Initialiser le répertoire de travail** :
   ```bash
   terraform init
   ```
2. **Formater et valider la syntaxe des scripts** :
   ```bash
   terraform fmt && terraform validate
   ```
3. **Préparer et inspecter le plan d'exécution** :
   ```bash
   terraform plan -out=plan.out
   ```
4. **Appliquer et provisionner les ressources sur AWS** :
   ```bash
   terraform apply plan.out
   ```
5. **Détruire l'infrastructure réseau proprement** :
   ```bash
   terraform destroy
   ```

---

## 📂 Contenu des Fichiers Clés

- **`main.tf`** : Contient la définition des ressources cœur (VPC, sous-réseaux, Internet Gateway, Elastic IP, NAT Gateway).
- **`routes.tf`** : Décrit les tables de routage publique et privée, configure les routes de sortie par défaut (`0.0.0.0/0`) et gère les associations avec les différents sous-réseaux.
- **`src/`** : Code source React / Tailwind du portfolio interactif de présentation.
