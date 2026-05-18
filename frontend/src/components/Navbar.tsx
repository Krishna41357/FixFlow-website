import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'PR Bot', path: '/bot' },
    { name: 'Engine', path: '/walkthrough' },
    { name: 'Docs', path: '/docs' },
    { name: 'Integrations', path: '/integrations' },
    { name: 'Pricing', path: '/pricing' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled
        ? 'bg-bg-primary/60 backdrop-blur-2xl border-b border-glass-border shadow-glass'
        : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="container-max flex items-center justify-between h-16 lg:h-18">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 group-hover:border-accent/50 group-hover:bg-accent/15 transition-all duration-300 group-hover:shadow-glow">
            <Activity className="w-5 h-5 text-accent" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gradient-white">FixFlow</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                location.pathname === link.path
                  ? 'text-accent bg-accent/10'
                  : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.04]'
              }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-accent rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="btn-icon"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
          </button>
          <Link to="/early-access" className="btn-primary text-sm">
            Get Early Access
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="btn-icon"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn-icon"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-glass-border bg-bg-primary/80 backdrop-blur-lg">
          <div className="container-max py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'text-accent bg-accent/10 font-medium'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.04]'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/early-access"
              onClick={() => setMobileMenuOpen(false)}
              className="block btn-primary text-center text-sm mt-4"
            >
              Get Early Access
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
