import { useState, useEffect } from 'react';
import { Menu, X, Download, LogIn } from 'lucide-react';
import logo from '../assest/logo.jpeg';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Products', href: '#products' },
  { label: 'Become Partner', href: '#partner' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Home');

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-nav shadow-glass-dark' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 flex-shrink-0">
            <img
              src={logo}
              alt="ThiruPay Logo"
              className="h-10 lg:h-12 w-auto"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setActiveNav(link.label)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeNav === link.label
                    ? 'text-orange-brand bg-orange-brand/10'
                    : 'text-white/80 hover:text-white hover:bg-white/8'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#partner"
              className="btn-secondary flex items-center gap-2 text-sm py-2.5"
            >
              <LogIn size={16} />
              Partner Login
            </a>
            <a
              href="#download"
              className="btn-primary flex items-center gap-2 text-sm py-2.5 animate-pulse-orange"
            >
              <Download size={16} />
              Download App
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="glass-nav border-t border-white/10 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                setActiveNav(link.label);
                setMobileOpen(false);
              }}
              className="block px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/8 font-medium transition-all"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <a href="#partner" className="btn-secondary text-center text-sm">
              Partner Login
            </a>
            <a href="#download" className="btn-primary text-center text-sm">
              Download App
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}