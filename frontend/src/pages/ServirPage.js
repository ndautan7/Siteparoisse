import { Link } from 'react-router-dom';
import { Heart, Music, BookOpen, Users, HandHeart, Flower2, BookMarked, Church, Baby, Cross, Mic, UserCheck } from 'lucide-react';
import { SocialIcons } from '@/components/SocialIcons';
import { SEO } from '@/components/SEO';
import { FadeIn } from '@/components/FadeIn';

const services = [
  {
    title: 'Chorale paroissiale',
    description: 'Rejoignez la chorale pour animer les messes et célébrations par le chant.',
    icon: Music,
    path: '/liturgie-musique',
    color: 'bg-violet-100 text-violet-600',
  },
  {
    title: 'Lecteurs',
    description: "Proclamez la Parole de Dieu lors des célébrations liturgiques.",
    icon: BookMarked,
    path: '/liturgie-musique',
    color: 'bg-sky-100 text-sky-600',
  },
  {
    title: 'Art Floral',
    description: "Fleurissez l'église et embellissez nos célébrations.",
    icon: Flower2,
    path: '/liturgie-musique',
    color: 'bg-rose-100 text-rose-600',
  },
  {
    title: "Servants d'autel",
    description: "Servez lors des messes et apprenez les gestes de la liturgie.",
    icon: Church,
    path: '/servants-vocations',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    title: 'Catéchisme',
    description: "Accompagnez les enfants dans leur découverte de la foi.",
    icon: Baby,
    path: '/catechisme',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    title: 'Aumônerie',
    description: "Encadrez les jeunes collégiens et lycéens dans leur cheminement.",
    icon: Users,
    path: '/aumonerie',
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    title: 'Éveil à la Foi',
    description: "Animez des rencontres pour les tout-petits (3-7 ans) et leurs parents.",
    icon: Heart,
    path: '/eveil-foi',
    color: 'bg-pink-100 text-pink-600',
  },
  {
    title: 'Parcours Alpha',
    description: "Accueillez et accompagnez les personnes qui découvrent ou redécouvrent la foi.",
    icon: BookOpen,
    path: '/alpha-catechumenat',
    color: 'bg-teal-100 text-teal-600',
  },
  {
    title: "Service d'écoute",
    description: "Offrez une écoute bienveillante aux personnes traversant des épreuves.",
    icon: UserCheck,
    path: '/service-ecoute',
    color: 'bg-cyan-100 text-cyan-600',
  },
  {
    title: 'Visite des malades (SEM)',
    description: "Rendez visite aux personnes isolées, malades ou en EHPAD.",
    icon: HandHeart,
    path: '/visite-malades',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    title: 'Secours Catholique',
    description: "Participez aux actions de solidarité et d'entraide.",
    icon: HandHeart,
    path: '/entraide',
    color: 'bg-red-100 text-red-600',
  },
  {
    title: 'Équipe funérailles',
    description: "Accompagnez les familles endeuillées dans la préparation des obsèques.",
    icon: Cross,
    path: '/funerailles',
    color: 'bg-slate-100 text-slate-600',
  },
  {
    title: 'Service Accueil',
    description: "Accueillez les visiteurs et paroissiens lors des messes et événements.",
    icon: Mic,
    path: '/services-transverses',
    color: 'bg-lime-100 text-lime-600',
  },
];

const ServirPage = () => {
  return (
    <div data-testid="servir-page">
      <SEO
        title="Servir"
        description="Découvrez tous les services à rejoindre dans la paroisse Notre Dame d'Autan. Chorale, catéchisme, solidarité, accueil... il y a une place pour chacun !"
      />

      {/* Hero */}
      <section className="relative h-[40vh] md:h-[45vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://customer-assets.emergentagent.com/job_c3efae68-56d0-4924-8ecf-4f7502ce3630/artifacts/54f2vm3r_Eglise-Castanet-Tolosan.jpg"
            alt="Vue de l'église de Castanet-Tolosan"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20"></div>
        </div>
        <SocialIcons />
        <div className="relative z-10 text-center text-white px-4">
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4" data-testid="servir-title">
            Servir dans la paroisse
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto">
            Il y a une place pour chacun ! Découvrez comment mettre vos talents au service de la communauté.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FadeIn>
          <div className="text-center mb-12">
            <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Chaque service est une manière de vivre sa foi concrètement et de contribuer à la vie de notre communauté.
              N'hésitez pas à nous contacter pour en savoir plus.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => {
            const IconComp = service.icon;
            return (
              <FadeIn key={service.title}>
                <Link
                  to={service.path}
                  className="group block bg-white rounded-xl border border-slate-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 h-full"
                  data-testid={`service-card-${service.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                >
                  <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-4`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-medium text-slate-900 text-lg mb-2 group-hover:text-gold transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </Link>
              </FadeIn>
            );
          })}
        </div>

        {/* CTA */}
        <FadeIn>
          <div className="mt-16 bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl p-8 border border-gold/20 text-center">
            <h2 className="font-serif text-2xl text-slate-deep mb-3">Envie de vous engager ?</h2>
            <p className="text-slate-600 mb-6 max-w-lg mx-auto">
              Contactez le secrétariat pour être orienté vers le service qui vous correspond.
            </p>
            <Link
              to="/secretariat"
              className="inline-flex items-center bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-full font-medium transition-colors"
              data-testid="servir-contact-cta"
            >
              Nous contacter
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default ServirPage;
