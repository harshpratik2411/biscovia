import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Cookie, 
  Instagram, 
  Twitter, 
  Facebook, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  Heart
} from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#3d2510] text-[#f5e4cf] pt-20 pb-10 px-6 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d3a971]/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="h-12 w-12 rounded-full bg-[#f5e4cf] text-[#3d2510] flex items-center justify-center transition-transform group-hover:rotate-12">
                <Cookie className="h-7 w-7" />
              </div>
              <span className="text-2xl font-bold tracking-[0.2em] uppercase">Biskovia</span>
            </Link>
            <p className="text-[#f5e4cf]/70 leading-relaxed max-w-xs">
              Crafting the finest, most delicious cookies delivered straight from our oven to your doorstep. Every bite is a moment of pure joy.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -3, color: '#f7d7a3' }}
                  className="h-10 w-10 rounded-full border border-[#f5e4cf]/20 flex items-center justify-center transition-colors hover:border-[#f7d7a3]"
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold uppercase tracking-widest text-[#f7d7a3]">Explore</h3>
            <ul className="space-y-4">
              {[
                { name: 'Our Menu', path: '/menu' },
                { name: 'About Us', path: '/about' },
                { name: 'Contact', path: '/contact' },
                { name: 'Special Offers', path: '/menu' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-[#f5e4cf]/70 hover:text-[#f7d7a3] transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold uppercase tracking-widest text-[#f7d7a3]">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[#f5e4cf]/70">
                <MapPin className="h-5 w-5 mt-1 text-[#f7d7a3]" />
                <span>123 Baker Street, Cookie Lane,<br />Bengaluru, KA 560001</span>
              </li>
              <li className="flex items-center gap-3 text-[#f5e4cf]/70">
                <Phone className="h-5 w-5 text-[#f7d7a3]" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-[#f5e4cf]/70">
                <Mail className="h-5 w-5 text-[#f7d7a3]" />
                <span>hello@biskovia.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold uppercase tracking-widest text-[#f7d7a3]">Newsletter</h3>
            <p className="text-[#f5e4cf]/70">Join our sweet community for exclusive updates and treats!</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your email address"
                className="w-full bg-[#f5e4cf]/5 border border-[#f5e4cf]/20 rounded-xl py-4 px-5 outline-none focus:border-[#f7d7a3] transition-colors text-sm"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-[#f7d7a3] text-[#3d2510] px-4 rounded-lg font-bold text-xs hover:bg-white transition-colors">
                JOIN
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#f5e4cf]/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-[#f5e4cf]/40 font-medium">
            © {currentYear} Biskovia. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-[#f5e4cf]/40 font-medium">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-400 fill-red-400" />
            <span>for cookie lovers</span>
          </div>
          <div className="flex gap-8 text-[11px] font-bold uppercase tracking-[0.15em] text-[#f5e4cf]/30">
            <a href="#" className="hover:text-[#f7d7a3] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#f7d7a3] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
