import { useEffect, useState, useCallback } from 'react';
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    if (news.length <= 1 || isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [news.length, isHovered]);

  const fetchNews = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/news?published_only=true`);
      setNews(response.data.slice(0, 6));
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'dd MMMM yyyy', { locale: fr });
    } catch {
      return dateString;
    }
  };

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % news.length);
  }, [news.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + news.length) % news.length);
  }, [news.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-white to-slate-50" data-testid="news-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex space-x-4">
              <div className="w-12 h-12 bg-gold/30 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50 overflow-hidden" data-testid="news-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-gold font-medium text-sm tracking-widest uppercase mb-4">
            Notre communauté
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal tracking-tight text-slate-deep mb-4" data-testid="news-title">
            Actualités
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full mb-6"></div>
          <p className="text-base md:text-lg leading-relaxed text-slate-600 max-w-2xl mx-auto">
            Découvrez les dernières nouvelles de notre communauté paroissiale
          </p>
        </div>

        {news.length === 0 ? (
          <p className="text-center text-slate-500" data-testid="no-news">Aucune actualité pour le moment.</p>
        ) : (
          <div 
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Carousel Container */}
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {news.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="w-full flex-shrink-0 px-2"
                  >
                    <article
                      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
                      data-testid={`news-card-${item.id}`}
                    >
                      <div className="grid md:grid-cols-2 gap-0">
                        {/* Image Side */}
                        <div className="relative aspect-[4/3] md:aspect-auto md:h-[450px] overflow-hidden">
                          {item.image_url ? (
                            <img
                              src={item.image_url}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center">
                              <span className="font-serif text-6xl text-gold/30">N</span>
                            </div>
                          )}
                          {/* Overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-white/20"></div>
                          
                          {/* Category Badge */}
                          {item.category && (
                            <div className="absolute top-4 left-4">
                              <span className="inline-block bg-gold text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg">
                                {item.category}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content Side */}
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                          {/* Date */}
                          <div className="flex items-center space-x-2 text-sm text-slate-500 mb-4">
                            <Calendar className="w-4 h-4 text-gold" />
                            <span>{formatDate(item.created_at)}</span>
                          </div>

                          {/* Title */}
                          <h3 className="font-serif text-2xl md:text-3xl text-slate-deep mb-4 group-hover:text-gold transition-colors duration-300 line-clamp-2">
                            {item.title}
                          </h3>

                          {/* Content Preview */}
                          <p className="text-slate-600 leading-relaxed mb-6 line-clamp-4">
                            {item.content}
                          </p>

                          {/* CTA Button */}
                          <button className="inline-flex items-center space-x-2 text-gold hover:text-gold-dark font-medium transition-all duration-300 group/btn">
                            <span>Lire la suite</span>
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            {news.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-gold hover:shadow-xl transition-all duration-300 z-10"
                  aria-label="Actualité précédente"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-gold hover:shadow-xl transition-all duration-300 z-10"
                  aria-label="Actualité suivante"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Dots Indicator */}
            {news.length > 1 && (
              <div className="flex justify-center items-center space-x-3 mt-8">
                {news.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentIndex
                        ? 'w-8 h-2 bg-gold'
                        : 'w-2 h-2 bg-slate-300 hover:bg-gold/50'
                    }`}
                    aria-label={`Aller à l'actualité ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Progress Bar */}
            {news.length > 1 && !isHovered && (
              <div className="mt-6 max-w-xs mx-auto">
                <div className="h-0.5 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gold transition-all duration-300"
                    style={{
                      width: `${((currentIndex + 1) / news.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
