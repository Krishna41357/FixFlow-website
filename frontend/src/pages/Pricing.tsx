import { motion } from 'framer-motion';
import { Check, X, Zap, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const PLANS = [
  {
    name: 'Free',
    price: 0,
    description: 'Get started at no cost',
    badge: 'Popular',
    badgeIcon: <Zap className="w-3 h-3" />,
    color: '#ef4444',
    glowBg: '#180808',
    glowBorder: '#3a1010',
    cta: 'Get started',
    ctaDisabled: false,
    billingNote: 'Always free',
    features: [
      { text: '3 PR reviews/day', included: true },
      { text: 'One account per email', included: true },
      { text: '3 suggested fixes/review', included: true },
      { text: 'Basic analysis', included: true },
      { text: 'GitHub integration', included: true },
      { text: 'Manual investigations', included: false },
      { text: 'Priority support', included: false },
      { text: 'Custom workflows', included: false },
    ],
  },
  {
    name: 'Starter',
    price: 15,
    description: 'Perfect for small teams',
    badge: 'Coming soon',
    color: '#3b82f6',
    glowBg: '#0a1220',
    glowBorder: '#1e3a5f',
    cta: 'Coming soon',
    ctaDisabled: true,
    billingNote: 'Billed monthly',
    features: [
      { text: 'Unlimited reviews', included: true },
      { text: '5 team members', included: true },
      { text: 'Unlimited suggested fixes', included: true },
      { text: 'Advanced analysis', included: true },
      { text: 'GitHub integration', included: true },
      { text: 'Manual investigations', included: true },
      { text: 'Priority support', included: true },
      { text: 'Custom workflows', included: false },
    ],
  },
  {
    name: 'Pro',
    price: 50,
    description: 'For growing teams',
    badge: 'Coming soon',
    color: '#8b5cf6',
    glowBg: '#120a20',
    glowBorder: '#3b1f5f',
    cta: 'Coming soon',
    ctaDisabled: true,
    billingNote: 'Billed monthly',
    features: [
      { text: 'Unlimited reviews', included: true },
      { text: 'Unlimited team members', included: true },
      { text: 'Unlimited suggested fixes', included: true },
      { text: 'Advanced analysis', included: true },
      { text: 'GitHub integration', included: true },
      { text: 'Manual investigations', included: true },
      { text: 'Priority support', included: true },
      { text: 'Custom workflows', included: true },
    ],
  },
  {
    name: 'Enterprise',
    price: 100,
    description: 'For large organizations',
    badge: 'Coming soon',
    color: '#10b981',
    glowBg: '#081a12',
    glowBorder: '#1a5c3a',
    cta: 'Coming soon',
    ctaDisabled: true,
    billingNote: 'Billed monthly',
    features: [
      { text: 'Unlimited reviews', included: true },
      { text: 'Unlimited team members', included: true },
      { text: 'Unlimited suggested fixes', included: true },
      { text: 'Advanced analysis + SLA', included: true },
      { text: 'GitHub + custom integrations', included: true },
      { text: 'Manual investigations', included: true },
      { text: 'Dedicated support', included: true },
      { text: 'Custom workflows', included: true },
    ],
  },
];

const COMPARISON_ROWS = [
  { name: 'PR reviews/day', values: ['3', '∞', '∞', '∞'] },
  { name: 'Suggested fixes', values: ['3', 'Unlimited', 'Unlimited', 'Unlimited'] },
  { name: 'Team members', values: ['1', '5+', 'Unlimited', 'Unlimited'] },
  { name: 'Manual investigations', values: [false, true, true, true] },
  { name: 'Priority support', values: [false, true, true, true] },
  { name: 'Custom workflows', values: [false, false, true, true] },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function Pricing() {
  const [showComparison, setShowComparison] = useState(false);

  return (
    <div className="min-h-screen relative pt-28 pb-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 0%, rgba(239,68,68,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">

        {/* Header */}
        <motion.div
          className="text-center mb-12 w-full"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
            style={{ color: '#ef4444', background: '#180808', border: '1px solid #3a1010' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Simple &amp; transparent pricing
          </span>
          <h1 className="text-5xl sm:text-6xl font-black text-white leading-tight mb-5">
            Choose your plan
          </h1>
          <p className="text-neutral-400 text-base leading-relaxed max-w-xl mx-auto">
            Get started for free with basic PR reviews, or upgrade as your team grows.
            All plans include our powerful GitHub integration.
          </p>
        </motion.div>

        {/* ── All 4 Plans Side-by-Side ── */}
        <motion.div
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
          style={{ maxWidth: '1100px' }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {PLANS.map((plan, i) => {
            const isFree = plan.name === 'Free';
            return (
              <motion.div
                key={plan.name}
                variants={itemVariants}
                className="rounded-2xl p-5 relative overflow-hidden group flex flex-col"
                style={{
                  background: '#111',
                  border: isFree ? `1.5px solid ${plan.color}` : '1px solid #242424',
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 30%, ${plan.color}16 0%, transparent 70%)`,
                  }}
                />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Badge */}
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full mb-4 self-start"
                    style={{
                      color: plan.color,
                      background: plan.glowBg,
                      border: `1px solid ${plan.glowBorder}`,
                    }}
                  >
                    {plan.badgeIcon}
                    {plan.badge}
                  </span>

                  {/* Name + description */}
                  <h3 className="text-xl font-black text-white mb-0.5">{plan.name}</h3>
                  <p className="text-neutral-500 text-xs mb-4">{plan.description}</p>

                  {/* Price */}
                  <div className={`mb-4 ${plan.ctaDisabled ? 'opacity-40' : ''}`}>
                    <div className="flex items-baseline gap-1 mb-0.5">
                      <span className="text-4xl font-black text-white">${plan.price}</span>
                      <span className="text-neutral-500 font-mono text-xs">/mo</span>
                    </div>
                    <p className="text-xs text-neutral-500 font-mono">{plan.billingNote}</p>
                  </div>

                  {/* CTA */}
                  {plan.ctaDisabled ? (
                    <button
                      disabled
                      className="w-full py-2.5 rounded-xl font-bold text-white text-sm mb-5 opacity-35 cursor-not-allowed"
                      style={{ background: plan.color, letterSpacing: '.02em' }}
                    >
                      {plan.cta}
                    </button>
                  ) : (
                    <Link
                      to="/early-access"
                      className="w-full py-2.5 rounded-xl font-bold text-white text-sm mb-5 transition-all hover:brightness-110 active:scale-95 text-center block"
                      style={{ background: plan.color, letterSpacing: '.02em' }}
                    >
                      {plan.cta}
                    </Link>
                  )}

                  {/* Divider */}
                  <div className="border-t border-neutral-800 mb-4" />

                  {/* Features */}
                  <p className="text-xs font-mono uppercase tracking-widest text-neutral-600 mb-3">
                    Features
                  </p>
                  <ul className={`space-y-2.5 flex-1 ${plan.ctaDisabled ? 'opacity-50' : ''}`}>
                    {plan.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs">
                        {f.included ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-3.5 h-3.5 text-neutral-700 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={f.included ? 'text-neutral-300' : 'text-neutral-600'}>
                          {f.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Collapsible Comparison Table ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full rounded-2xl overflow-hidden"
          style={{ maxWidth: '1100px', background: '#111', border: '1px solid #1e1e1e' }}
        >
          {/* Toggle header */}
          <button
            onClick={() => setShowComparison((v) => !v)}
            className="w-full flex items-center justify-between px-6 py-4 text-left group"
          >
            <span className="text-sm font-black text-white">Full comparison</span>
            <ChevronDown
              className="w-4 h-4 text-neutral-500 transition-transform duration-300 group-hover:text-neutral-300"
              style={{ transform: showComparison ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </button>

          {showComparison && (
            <div className="px-6 pb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ borderBottom: '1px solid #2a2a2a' }}>
                      <th className="text-left py-2 px-2 font-mono font-bold uppercase tracking-widest text-neutral-500 text-xs w-40">
                        Feature
                      </th>
                      {PLANS.map((p) => (
                        <th
                          key={p.name}
                          className="text-center py-2 px-2 font-mono font-bold uppercase tracking-widest text-xs"
                          style={{ color: p.ctaDisabled ? '#444' : p.color }}
                        >
                          {p.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_ROWS.map((row, idx) => (
                      <tr key={idx} style={{ borderTop: '1px solid #1a1a1a' }}>
                        <td className="py-2 px-2 text-neutral-400 font-mono">{row.name}</td>
                        {row.values.map((val, vi) => (
                          <td key={vi} className={`py-2 px-2 text-center ${PLANS[vi].ctaDisabled ? 'opacity-40' : ''}`}>
                            {typeof val === 'boolean' ? (
                              val ? (
                                <Check className="w-3.5 h-3.5 text-emerald-500 mx-auto" />
                              ) : (
                                <X className="w-3.5 h-3.5 text-neutral-700 mx-auto" />
                              )
                            ) : (
                              <span className={vi === 0 ? 'text-neutral-200 font-semibold' : 'text-neutral-400'}>
                                {val}
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}