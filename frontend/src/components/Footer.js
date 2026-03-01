import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin, Check, Map } from 'lucide-react';
import axios from 'axios';
import ClochersMap from '@/components/ClochersMap';
import { clochersData } from '@/data/clochersData';
import { APP_VERSION } from '@/version';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      await axios.post(`${BACKEND_URL}/api/subscribers`, { email });
      setSubscribed(true);
      setEmail('');
    } catch (err) {
      console.error('Error subscribing:', err);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300" data-testid="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <h3 className="font-serif text-xl text-white mb-4">Notre Dame d'Autan</h3>
            <p className="text-sm leading-relaxed mb-4">
              Une paroisse vivante au service de la foi et de la fraternité.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/p/Paroisse-de-Castanet-Tolosan-100070274408625/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors"
                data-testid="footer-facebook-link"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/paroisses.saint.orens.castanet?igsh=OTYycjhmZ2UzbWVt"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors"
                data-testid="footer-instagram-link"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-white mb-4">Accès rapide</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/horaires-messes" className="hover:text-gold transition-colors">
                  Horaires des messes
                </Link>
              </li>
              <li>
                <Link to="/secretariat" className="hover:text-gold transition-colors">
                  Secrétariat
                </Link>
              </li>
              <li>
                <Link to="/demander-sacrement" className="hover:text-gold transition-colors">
                  Demander un sacrement
                </Link>
              </li>
              <li>
                <Link to="/funerailles" className="hover:text-gold transition-colors">
                  Funérailles
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>
                  Paroisse Notre Dame d'Autan<br />
                  <a
                    href="https://www.google.com/maps/place/Ensemble+paroissial+catholique+de+Castanet-Tolosan/@43.5157697,1.4983272,20.5z/data=!4m6!3m5!1s0x12aebe4bb7540001:0xc954e76ed59283db!8m2!3d43.515777!4d1.4985022!16s%2Fg%2F11txfbs_9p"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold transition-colors underline underline-offset-2"
                  >Castanet-Tolosan</a>
                  {' & '}
                  <a
                    href="https://www.google.com/maps/search/Église%20Saint-Orens%20Saint-Orens-de-Gameville%20France"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold transition-colors underline underline-offset-2"
                  >Saint-Orens</a>
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0" />
                <div>
                  <a href="tel:0561005169" className="hover:text-gold transition-colors block">Castanet : 05 61 00 51 69</a>
                  <a href="tel:0561277685" className="hover:text-gold transition-colors block mt-1">Saint-Orens : 05 61 27 76 85</a>
                </div>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:contact@notredamedautan.fr" className="hover:text-gold transition-colors">
                  contact@notredamedautan.fr
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-medium text-white mb-4">Newsletter</h4>
            <p className="text-sm mb-4">
              Restez informé de nos actualités et événements
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-sm text-emerald-400" data-testid="newsletter-confirmation">
                <Check className="w-4 h-4" />
                <span>Merci pour votre inscription !</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex" data-testid="newsletter-form">
                <input
                  type="email"
                  required
                  placeholder="Votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 min-w-0 px-3 py-2 bg-slate-800 border border-slate-700 rounded-l-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold"
                  data-testid="newsletter-email-input"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gold hover:bg-gold-dark text-white rounded-r-lg text-sm font-medium transition-colors whitespace-nowrap"
                  data-testid="newsletter-subscribe-button"
                >
                  S'inscrire
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Carte des 16 clochers */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-6">
            <Map className="w-5 h-5 text-gold" />
            <h4 className="font-serif text-lg text-white">Carte des 16 clochers</h4>
          </div>
          <div className="rounded-xl overflow-hidden border border-slate-700">
            <ClochersMap clochers={clochersData} height="350px" />
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} Paroisse Notre Dame d'Autan. Tous droits réservés.</p>
          <p className="text-slate-600 text-xs mt-2">v{APP_VERSION}</p>
        </div>
      </div>
    </footer>
  );
};