import { Hero } from '@/components/Hero';
import { NewsSection } from '@/components/NewsSection';

const HomePage = () => {
  return (
    <div data-testid="home-page">
      <Hero />
      <NewsSection />
      
      {/* Citation biblique */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl p-8 border border-gold/20 text-center">
          <blockquote className="font-serif text-2xl text-slate-deep italic mb-4">
            "Ma maison sera appelée une maison de prière pour tous les peuples."
          </blockquote>
          <p className="text-gold font-medium">Isaïe 56, 7</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;