import { Users, Heart, BookOpen, Church, GraduationCap, Baby, Cross, MessagesSquare, Flower2, HandHeart, Stethoscope, HelpingHand, Home, Building2, Sparkles } from 'lucide-react';

const contentData = {
  equipe: {
    title: 'Équipe Pastorale',
    description: 'Une équipe au service de la communauté pour l\'accompagner dans sa vie de foi.',
    icon: Users,
    content: `Notre équipe pastorale est au service de la communauté paroissiale.

**Curé :** Père [Nom]
**Diacres :** [Noms]
**Équipe d'Animation Pastorale (EAP) :** Composée de paroissiens engagés qui accompagnent la vie de la paroisse.

N'hésitez pas à nous contacter pour toute question ou besoin spirituel.`,
  },
  economique: {
    title: 'Vie Économique',
    content: `La vie économique de la paroisse est gérée avec transparence et responsabilité.

**Conseil des Finances :** Assure la gestion financière de la paroisse
**Commission des Travaux :** Veille à l'entretien de nos églises
**Denier de l'Église :** Votre générosité permet de financer la mission de l'Église
**Legs et donations :** Pour soutenir durablement notre communauté`,
  },
  clochers: {
    title: 'Nos Clochers',
    content: `Notre paroisse compte plusieurs églises, chacune avec son histoire unique.

**Église Notre-Dame d'Autan**
Architecture remarquable, point de repère de notre communauté.

**Chapelles et oratoires**
Dispersés sur le territoire paroissial, ils témoignent de la foi de nos aînés.`,
  },
  services: {
    title: 'Services Transverses',
    content: `**Service Communication**
Gestion du site web, réseaux sociaux, bulletin paroissial

**Service Accueil**
Équipe de bénévoles qui accueillent chaleureusement tous les visiteurs`,
  },
  eveil: {
    title: 'Éveil à la Foi',
    content: `Pour les enfants de 3 à 7 ans, découverte de la foi chrétienne en famille.

Rencontres mensuelles le dimanche après la messe, avec contes, chants et activités ludiques.`,
  },
  catechisme: {
    title: 'Catéchisme',
    content: `Pour les enfants du CE2 à la 6ème.

Rencontres hebdomadaires en petits groupes pour découvrir la vie de Jésus, les sacrements et vivre en communauté.

**Inscriptions :** Se renseigner au secrétariat`,
  },
  aumonerie: {
    title: 'Aumônerie',
    content: `Pour les collégiens et lycéens.

Rencontres, temps de partage, activités, camps... Un lieu pour grandir dans la foi avec d'autres jeunes.

**Contact :** aumonerie@notredamedautan.fr`,
  },
  mouvements: {
    title: 'Mouvements de Jeunesse',
    content: `**Scouts et Guides de France**
Activités de plein air, camps, service

**Mouvement Eucharistique des Jeunes (MEJ)**
Groupes de partage et de prière

**Patronage**
Activités ludiques et sportives dans un esprit chrétien`,
  },
  servants: {
    title: "Servants d'autel et Vocations",
    content: `**Servants d'autel**
Enfants et jeunes qui servent à l'autel pendant la messe. Formation assurée.

**Accompagnement des vocations**
Pour ceux qui s'interrogent sur un appel à la vie consacrée ou sacerdotale.`,
  },
  sacrement: {
    title: 'Demander un Sacrement',
    content: `**Baptême**
Pour les enfants et les adultes. Préparation assurée.

**Première Communion**
Après 2 ans de catéchisme minimum.

**Confirmation**
Sacrement de la maturité chrétienne.

**Réconciliation (Confession)**
Permanences et sur rendez-vous.

**Contactez le secrétariat pour toute demande.**`,
  },
  mariage: {
    title: 'Le Mariage',
    content: `Se marier à l'Église est un engagement profond et joyeux.

**Préparation au mariage**
Parcours de préparation avec des couples accompagnateurs.

**Équipes Notre-Dame**
Mouvement de spiritualité conjugale

**Cana**
Formation à la vie de couple

**Prendre contact au moins 6 mois avant la date souhaitée.**`,
  },
  liturgie: {
    title: 'Liturgie & Musique',
    content: `**Chorale paroissiale**
Rehétitions hebdomadaires, tous niveaux bienvenus

**Art Floral**
Équipe de bénévoles qui fleurissent l'église

**Sacristains**
Service discret et essentiel pour la liturgie`,
  },
  funerailles: {
    title: 'Funérailles',
    content: `Accompagnement des familles en deuil.

**Équipe funérailles**
Préparation de la célébration, soutien et écoute.

**Contact en urgence via le secrétariat ou les pompes funèbres.**`,
  },
  alpha: {
    title: 'Parcours Alpha & Catéchuménat',
    content: `**Parcours Alpha**
Découvrir ou redécouvrir la foi chrétienne dans la convivialité. Repas, vidéo, échanges.

**Catéchuménat**
Pour les adultes souhaitant recevoir le baptême, la confirmation ou l'eucharistie. Accompagnement personnalisé sur plusieurs mois.`,
  },
  groupes: {
    title: 'Groupes de Partage',
    content: `**Fraternités**
Petits groupes de partage de la Parole et de la vie

**Groupes Pros**
Réflexion sur la foi et le travail

**Groupe Biblique**
Étude approfondie de la Bible`,
  },
  meditation: {
    title: 'Méditation Chrétienne',
    content: `Temps de silence et de prière contemplatif.

Rencontres hebdomadaires ouvertes à tous.

**Initiation possible pour les débutants.**`,
  },
  ressources: {
    title: 'Ressources',
    content: `**Librairie religieuse**
Livres, chapelets, icônes, objets de piété

**Radio Présence**
Émissions spirituelles et culturelles

**Liens utiles**
- Dioèse de Toulouse
- Vatican
- Aleteia`,
  },
  ecoute: {
    title: "Service d'Écoute Louis et Zélie",
    content: `Service d'écoute téléphonique et en personne pour ceux qui traversent une épreuve.

**Confidentialité assurée**

Contact via le secrétariat.`,
  },
  malades: {
    title: 'Visite des Malades (SEM)',
    content: `**Service Évangélique des Malades**

Équipe de bénévoles qui visitent les personnes malades ou âgées à domicile ou en maison de retraite.

Sacrement des malades sur demande.`,
  },
  entraide: {
    title: 'Entraide et Solidarité',
    content: `**Secours Catholique**
Aide matérielle et accompagnement

**Café Amitié**
Lieu de rencontre convivial

**Hospitalité de Lourdes**
Pèlerinages pour personnes malades ou handicapées

**Famille Bartimée**
Accueil des personnes handicapées

**Lourdes Cancer Espérance**
Soutien aux malades du cancer`,
  },
};

const ContentPage = ({ section }) => {
  const data = contentData[section] || { title: 'Page en construction', content: 'Contenu à venir prochainement.' };

  return (
    <div className="min-h-screen bg-paper py-24" data-testid={`content-page-${section}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-5xl md:text-7xl font-medium tracking-tight leading-tight text-slate-deep mb-8">
          {data.title}
        </h1>
        <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
          <div className="prose prose-slate max-w-none">
            {data.content.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <h3 key={index} className="font-serif text-2xl text-slate-deep mt-6 mb-3">
                    {paragraph.replace(/\*\*/g, '')}
                  </h3>
                );
              }
              return paragraph ? (
                <p key={index} className="text-slate-600 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentPage;