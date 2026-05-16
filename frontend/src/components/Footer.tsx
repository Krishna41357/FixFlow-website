import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';
import GithubIcon from './GithubIcon';
import TwitterIcon from './TwitterIcon';
import LinkedinIcon from './LinkedinIcon';

export default function Footer() {
  const footerLinks = {
    Product: [
      { name: 'GitHub PR Bot', to: '/bot' },
      { name: 'How it works', to: '/walkthrough' },
      { name: 'Integrations', to: '/integrations' },
      { name: 'Pricing', to: '#' },
    ],
    Resources: [
      { name: 'Documentation', to: '/docs' },
      { name: 'Blog', to: '#' },
      { name: 'Community', to: '#' },
      { name: 'API Reference', to: '#' },
    ],
    Company: [
      { name: 'About', to: '#' },
      { name: 'Careers', to: '#' },
      { name: 'Privacy', to: '#' },
      { name: 'Terms', to: '#' },
    ],
  };

  return (
    <footer className="relative border-t border-glass-border bg-bg-secondary">
      {/* Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 divider-glow" />

      <div className="container-max pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2.5 group mb-5">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 group-hover:border-accent/40 transition-all duration-300">
                <Activity className="w-5 h-5 text-accent" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gradient-white">FixFlow</span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed mb-6 max-w-sm">
              AI-powered data lineage failure diagnosis. Catch schema-breaking changes before they reach production.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: <GithubIcon className="w-[18px] h-[18px]" />, href: '#' },
                { icon: <TwitterIcon className="w-[18px] h-[18px]" />, href: '#' },
                { icon: <LinkedinIcon className="w-[18px] h-[18px]" />, href: '#' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.06] text-text-muted hover:text-accent hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-text-secondary mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.to}
                      className="text-sm text-text-muted hover:text-text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-glass-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-xs">
            &copy; {new Date().getFullYear()} FixFlow. All rights reserved.
          </p>
          <p className="text-text-muted/50 text-xs">
            Powered by AI — Previously Pipeline Autopsy
          </p>
        </div>
      </div>
    </footer>
  );
}
