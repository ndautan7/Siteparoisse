import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart, Music, BookOpen, Users, HandHeart, Flower2, BookMarked, Church,
  Baby, Cross, Mic, UserCheck, PartyPopper, UtensilsCrossed, Palette,
  Package, Camera, ArrowRight, ArrowLeft, CheckCircle2, RotateCcw, Sparkles
} from 'lucide-react';
import { SocialIcons } from '@/components/SocialIcons';
import { SEO } from '@/components/SEO';
import { FadeIn } from '@/components/FadeIn';

const regularServices = [
  { title: 'Chorale paroissiale', description: 'Rejoignez la chorale pour animer les messes et célébrations par le chant.', icon: Music, path: '/liturgie-musique', color: 'bg-violet-100 text-violet-600', tags: ['creative', 'during_mass', 'regular'] },
  { title: 'Lecteurs', description: 'Proclamez la Parole de Dieu lors des célébrations liturgiques.', icon: BookMarked, path: '/liturgie-musique', color: 'bg-sky-100 text-sky-600', tags: ['creative', 'during_mass', 'regular'] },
  { title: 'Art Floral', description: "Fleurissez l'église et embellissez nos célébrations.", icon: Flower2, path: '/liturgie-musique', color: 'bg-rose-100 text-rose-600', tags: ['creative', 'outside_mass', 'regular'] },
  { title: "Servants d'autel", description: 'Servez lors des messes et apprenez les gestes de la liturgie.', icon: Church, path: '/servants-vocations', color: 'bg-amber-100 text-amber-600', tags: ['hands_on', 'during_mass', 'regular'] },
  { title: 'Catéchisme', description: 'Accompagnez les enfants dans leur découverte de la foi.', icon: Baby, path: '/catechisme', color: 'bg-emerald-100 text-emerald-600', tags: ['listener', 'outside_mass', 'regular'] },
  { title: 'Aumônerie', description: 'Encadrez les jeunes collégiens et lycéens dans leur cheminement.', icon: Users, path: '/aumonerie', color: 'bg-indigo-100 text-indigo-600', tags: ['listener', 'outside_mass', 'regular'] },
  { title: 'Éveil à la Foi', description: 'Animez des rencontres pour les tout-petits (3-7 ans) et leurs parents.', icon: Heart, path: '/eveil-foi', color: 'bg-pink-100 text-pink-600', tags: ['listener', 'creative', 'outside_mass', 'regular'] },
  { title: 'Parcours Alpha', description: 'Accueillez et accompagnez les personnes qui découvrent la foi.', icon: BookOpen, path: '/alpha-catechumenat', color: 'bg-teal-100 text-teal-600', tags: ['listener', 'outside_mass', 'regular'] },
  { title: "Service d'écoute", description: 'Offrez une écoute bienveillante aux personnes traversant des épreuves.', icon: UserCheck, path: '/service-ecoute', color: 'bg-cyan-100 text-cyan-600', tags: ['listener', 'outside_mass', 'regular'] },
  { title: 'Visite des malades (SEM)', description: 'Rendez visite aux personnes isolées, malades ou en EHPAD.', icon: HandHeart, path: '/visite-malades', color: 'bg-orange-100 text-orange-600', tags: ['listener', 'outside_mass', 'regular'] },
  { title: 'Secours Catholique', description: "Participez aux actions de solidarité et d'entraide.", icon: HandHeart, path: '/entraide', color: 'bg-red-100 text-red-600', tags: ['organizer', 'hands_on', 'outside_mass', 'regular'] },
  { title: 'Équipe funérailles', description: 'Accompagnez les familles endeuillées dans la préparation des obsèques.', icon: Cross, path: '/funerailles', color: 'bg-slate-100 text-slate-600', tags: ['listener', 'outside_mass', 'regular'] },
  { title: 'Service Accueil', description: 'Accueillez les visiteurs et paroissiens lors des messes et événements.', icon: Mic, path: '/services-transverses', color: 'bg-lime-100 text-lime-600', tags: ['organizer', 'during_mass', 'regular'] },
];

const occasionalServices = [
  { title: "Préparation d'événements", description: "Aidez à organiser les temps forts : kermesse, fête paroissiale, concerts, journées portes ouvertes.", icon: PartyPopper, color: 'bg-fuchsia-100 text-fuchsia-600', tags: ['organizer', 'outside_mass', 'occasional'] },
  { title: 'Mise en place & rangement', description: "Installez les salles, les chaises, la sono, les décorations avant et après les événements.", icon: Package, color: 'bg-yellow-100 text-yellow-600', tags: ['hands_on', 'outside_mass', 'occasional'] },
  { title: "Service apéritif & repas", description: "Préparez et servez lors des repas partagés, pots de l'amitié et apéritifs paroissiaux.", icon: UtensilsCrossed, color: 'bg-orange-100 text-orange-600', tags: ['hands_on', 'outside_mass', 'occasional'] },
  { title: 'Décoration & scénographie', description: "Décorez les salles et l'église pour les fêtes, les temps liturgiques forts et les événements.", icon: Palette, color: 'bg-purple-100 text-purple-600', tags: ['creative', 'outside_mass', 'occasional'] },
  { title: 'Photos & communication', description: "Photographiez les événements et aidez à la communication sur les réseaux sociaux.", icon: Camera, color: 'bg-blue-100 text-blue-600', tags: ['creative', 'outside_mass', 'occasional'] },
];

const allServices = [...regularServices, ...occasionalServices];

const quizQuestions = [
  {
    id: 'personality',
    question: 'Vous êtes plutôt...',
    options: [
      { label: 'Créatif', value: 'creative', emoji: '🎨' },
      { label: 'À l\'écoute', value: 'listener', emoji: '👂' },
      { label: 'Organisateur', value: 'organizer', emoji: '📋' },
      { label: 'Manuel / pratique', value: 'hands_on', emoji: '🔧' },
    ],
  },
  {
    id: 'when',
    question: 'Vous préférez servir...',
    options: [
      { label: 'Pendant les messes', value: 'during_mass', emoji: '⛪' },
      { label: 'En dehors des messes', value: 'outside_mass', emoji: '🌳' },
      { label: 'Les deux !', value: 'both_times', emoji: '🙌' },
    ],
  },
  {
    id: 'availability',
    question: 'Votre disponibilité ?',
    options: [
      { label: 'Régulière (chaque semaine/mois)', value: 'regular', emoji: '📅' },
      { label: 'Occasionnelle (quand je peux)', value: 'occasional', emoji: '✋' },
      { label: 'Les deux', value: 'both_avail', emoji: '🤝' },
    ],
  },
];

const getRecommendations = (answers) => {
  return allServices
    .map((service) => {
      let score = 0;
      // Personality match
      if (service.tags.includes(answers.personality)) score += 3;
      // Time match
      if (answers.when === 'both_times') {
        score += 1;
      } else if (service.tags.includes(answers.when)) {
        score += 2;
      }
      // Availability match
      if (answers.availability === 'both_avail') {
        score += 1;
      } else if (service.tags.includes(answers.availability)) {
        score += 2;
      }
      return { ...service, score };
    })
    .filter((s) => s.score >= 3)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
};

const ServiceCard = ({ service, testIdPrefix = 'service' }) => {
  const IconComp = service.icon;
  return (
    <Link
      to={service.path || '/servir'}
      className="group block bg-white rounded-xl border border-slate-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 h-full"
      data-testid={`${testIdPrefix}-card-${service.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
    >
      <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-4`}>
        <IconComp className="w-6 h-6" />
      </div>
      <h3 className="font-medium text-slate-900 text-lg mb-2 group-hover:text-gold transition-colors">
        {service.title}
      </h3>
      <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
    </Link>
  );
};

const ServirPage = () => {
  const [quizStep, setQuizStep] = useState(-1); // -1 = not started
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);

  const handleAnswer = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      setResults(getRecommendations(newAnswers));
    }
  };

  const resetQuiz = () => {
    setQuizStep(-1);
    setAnswers({});
    setResults(null);
  };

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
            Il y a une place pour chacun !
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FadeIn>
          <div className="text-center mb-12">
            <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Chaque service est une manière de vivre sa foi concrètement et de contribuer à la vie de notre communauté.
            </p>
          </div>
        </FadeIn>

        {/* Regular Services */}
        <FadeIn>
          <h2 className="font-serif text-2xl text-slate-deep mb-6 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-gold rounded-full"></span>
            Services réguliers
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {regularServices.map((service) => (
            <FadeIn key={service.title}>
              <ServiceCard service={service} testIdPrefix="regular" />
            </FadeIn>
          ))}
        </div>

        {/* Occasional Services */}
        <FadeIn>
          <h2 className="font-serif text-2xl text-slate-deep mb-2 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-gold rounded-full"></span>
            Coups de main ponctuels
          </h2>
          <p className="text-slate-500 text-sm mb-6 ml-11">
            Pas besoin de s'engager sur la durée, chaque coup de main compte !
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {occasionalServices.map((service) => (
            <FadeIn key={service.title}>
              <ServiceCard service={service} testIdPrefix="occasional" />
            </FadeIn>
          ))}
        </div>

        {/* Quiz Section */}
        <FadeIn>
          <div className="bg-gradient-to-br from-slate-50 to-gold/5 rounded-2xl border border-slate-200 p-8 md:p-10 mb-16" data-testid="quiz-section">
            <div className="text-center mb-8">
              <Sparkles className="w-8 h-8 text-gold mx-auto mb-3" />
              <h2 className="font-serif text-2xl md:text-3xl text-slate-deep mb-2">
                Quel service est fait pour vous ?
              </h2>
              <p className="text-slate-500 text-sm">
                3 questions pour trouver votre place
              </p>
            </div>

            {/* Quiz not started */}
            {quizStep === -1 && !results && (
              <div className="text-center">
                <button
                  onClick={() => setQuizStep(0)}
                  className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white px-8 py-3 rounded-full font-medium transition-colors"
                  data-testid="quiz-start-button"
                >
                  C'est parti
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Quiz in progress */}
            {quizStep >= 0 && !results && (
              <div className="max-w-lg mx-auto">
                {/* Progress */}
                <div className="flex gap-2 mb-8">
                  {quizQuestions.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-colors ${
                        i <= quizStep ? 'bg-gold' : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-xs text-slate-400 text-center mb-2">
                  Question {quizStep + 1} / {quizQuestions.length}
                </p>
                <h3 className="font-serif text-xl text-slate-deep text-center mb-6" data-testid="quiz-question">
                  {quizQuestions[quizStep].question}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {quizQuestions[quizStep].options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleAnswer(quizQuestions[quizStep].id, opt.value)}
                      className={`p-4 rounded-xl border-2 text-left transition-all duration-200 hover:border-gold hover:shadow-md ${
                        answers[quizQuestions[quizStep].id] === opt.value
                          ? 'border-gold bg-gold/5'
                          : 'border-slate-200 bg-white'
                      }`}
                      data-testid={`quiz-option-${opt.value}`}
                    >
                      <span className="text-2xl mb-1 block">{opt.emoji}</span>
                      <span className="font-medium text-slate-800">{opt.label}</span>
                    </button>
                  ))}
                </div>

                {quizStep > 0 && (
                  <button
                    onClick={() => setQuizStep(quizStep - 1)}
                    className="mt-6 text-sm text-slate-400 hover:text-slate-600 flex items-center gap-1 mx-auto transition-colors"
                    data-testid="quiz-back-button"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    Question précédente
                  </button>
                )}
              </div>
            )}

            {/* Results */}
            {results && (
              <div data-testid="quiz-results">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <p className="font-medium text-slate-700">
                    {results.length > 0
                      ? `Nous vous recommandons ${results.length} service${results.length > 1 ? 's' : ''} :`
                      : "Tous les services pourraient vous convenir ! Voici quelques suggestions :"}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {(results.length > 0 ? results : allServices.slice(0, 4)).map((service) => {
                    const IconComp = service.icon;
                    return (
                      <Link
                        key={service.title}
                        to={service.path || '/servir'}
                        className="flex items-start gap-4 bg-white rounded-xl border border-slate-100 p-4 hover:shadow-md transition-all group"
                        data-testid={`quiz-result-${service.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      >
                        <div className={`w-10 h-10 rounded-lg ${service.color} flex items-center justify-center flex-shrink-0`}>
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900 group-hover:text-gold transition-colors">
                            {service.title}
                          </h4>
                          <p className="text-slate-500 text-sm mt-0.5">{service.description}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                <div className="text-center">
                  <button
                    onClick={resetQuiz}
                    className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-gold transition-colors"
                    data-testid="quiz-restart-button"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Recommencer le questionnaire
                  </button>
                </div>
              </div>
            )}
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn>
          <div className="bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl p-8 border border-gold/20 text-center">
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
