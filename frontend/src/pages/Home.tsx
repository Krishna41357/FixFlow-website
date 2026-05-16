import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GitPullRequest, Database, Zap, Search, Terminal, Shield, ChevronRight, CheckCircle2 } from 'lucide-react';
import GithubIcon from '../components/GithubIcon';
import { motion, AnimatePresence } from 'framer-motion';
import CardSwap, { Card } from '../components/CardSwap';

const features = [
  {
    icon: <Search className="w-9 h-9" />,
    title: 'Dynamic Lineage Traversal',
    desc: 'Navigate upstream dynamically with configurable depth via OpenMetadata. We trace the exact origin of every failure across your entire data pipeline — no matter how deep the dependency chain goes.',
    tag: '01',
    accent: '#ef4444',
    detail: 'Powered by OpenMetadata column-level lineage graph',
  },
  {
    icon: <GitPullRequest className="w-9 h-9" />,
    title: 'Proactive PR Reviews',
    desc: 'A companion GitHub bot catches schema-breaking changes before they merge, posting AI-generated impact warnings directly in your PR. Shift left on data quality — catch issues before production ever sees them.',
    tag: '02',
    accent: '#f97316',
    detail: 'Integrates with GitHub Actions and PR webhooks',
  },
  {
    icon: <Zap className="w-9 h-9" />,
    title: 'Plain English Explanations',
    desc: 'Stop decoding cryptic stack traces. Our AI explains exactly what went wrong, which upstream model caused it, and precisely how to fix it — all in plain language your whole team can understand.',
    tag: '03',
    accent: '#eab308',
    detail: 'Claude-powered root cause analysis and fix suggestions',
  },
];

const integrations = [
  {
    name: 'OpenMetadata',
    icon: <Database className="w-8 h-8" />,
    color: '#FF694B',
    desc: 'Column-level lineage traversal and asset discovery',
    badge: 'Core',
  },
  {
    name: 'dbt Core',
    icon: <Terminal className="w-8 h-8" />,
    color: '#FF6B6B',
    desc: 'Automatic failure ingestion from dbt run results',
    badge: 'Core',
  },
  {
    name: 'GitHub',
    icon: <GithubIcon className="w-8 h-8" />,
    color: '#ffffff',
    desc: 'PR bot that flags breaking schema changes pre-merge',
    badge: 'Bot',
  },
  {
    name: 'Snowflake',
    icon: <Shield className="w-8 h-8" />,
    color: '#29B5E8',
    desc: 'Query history and warehouse-level impact analysis',
    badge: 'Warehouse',
  },
];

function FeaturesBlock() {
  const [activeIdx, setActiveIdx] = useState(0);
  const intervalRef = useRef(null);
  const DELAY = 3000;

  const advance = useCallback(() => {
    setActiveIdx(prev => (prev + 1) % features.length);
  }, []);

  const resetInterval = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(advance, DELAY);
  }, [advance]);

  useEffect(() => {
    intervalRef.current = setInterval(advance, DELAY);
    return () => clearInterval(intervalRef.current);
  }, [advance]);

  const active = features[activeIdx];

  return (
    <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
      {/* Left: Card stack + dots */}
      <div className="w-full lg:w-1/2 flex flex-col items-center gap-6">
        <div className="relative w-full max-w-[500px]" style={{ height: '370px' }}>
          <CardSwap
            width="100%"
            height={350}
            cardDistance={45}
            verticalDistance={28}
            delay={DELAY}
            pauseOnHover
            skewAmount={3}
            easing="elastic"
            onCardClick={(idx) => {
              setActiveIdx(idx % features.length);
              resetInterval();
            }}
          >
            {features.map((f, i) => (
              <Card key={i}>
                <div
                  className="w-full h-full flex flex-col justify-between p-8 rounded-2xl cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)`,
                    border: `1px solid ${f.accent}40`,
                    boxShadow: `0 0 50px ${f.accent}15`,
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span
                        className="text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                        style={{ color: f.accent, background: `${f.accent}18`, border: `1px solid ${f.accent}30` }}
                      >
                        {f.tag}
                      </span>
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: `${f.accent}18`, color: f.accent, border: `1px solid ${f.accent}30` }}
                      >
                        {f.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-black text-white mb-4 leading-tight">{f.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{f.desc}</p>
                  </div>
                  <div
                    className="mt-6 pt-4 flex items-center gap-2"
                    style={{ borderTop: `1px solid ${f.accent}20` }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: f.accent }} />
                    <span className="text-xs font-mono" style={{ color: `${f.accent}80` }}>{f.detail}</span>
                  </div>
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>

        {/* Nav dots */}
        <div className="flex items-center gap-3">
          {features.map((f, i) => (
            <button
              key={i}
              onClick={() => { setActiveIdx(i); resetInterval(); }}
              className="transition-all duration-300 rounded-full"
              style={{
                width: activeIdx === i ? '28px' : '8px',
                height: '8px',
                background: activeIdx === i ? f.accent : 'rgba(255,255,255,0.2)',
                boxShadow: activeIdx === i ? `0 0 10px ${f.accent}80` : 'none',
              }}
            />
          ))}
        </div>
      </div>

      {/* Right: Synced text */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left" style={{ minHeight: '280px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center lg:items-start"
          >
            <span
              className="text-xs font-mono font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
              style={{ color: active.accent, background: `${active.accent}15`, border: `1px solid ${active.accent}30` }}
            >
              {active.tag}
            </span>
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
              style={{ background: `${active.accent}15`, color: active.accent, border: `1px solid ${active.accent}30` }}
            >
              {active.icon}
            </div>
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight mb-5 leading-tight text-white">
              {active.title}
            </h3>
            <p className="text-text-secondary text-base leading-relaxed max-w-md mb-6">
              {active.desc}
            </p>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono"
              style={{ background: `${active.accent}10`, border: `1px solid ${active.accent}25`, color: `${active.accent}cc` }}
            >
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: active.accent }} />
              {active.detail}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="relative">

      {/* ── Hero Section ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-0">
        <div className="absolute inset-0 bg-grid-pattern" />
        <div className="absolute inset-0 bg-radial-glow" />
        <div className="absolute inset-0 noise-overlay" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/3 rounded-full blur-[150px] animate-pulse [animation-delay:1s]" />

        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-40 z-10"
          style={{ background: 'linear-gradient(to bottom, transparent, #0a0a0a)' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-24">
          <motion.div
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
            initial="hidden"
            animate="visible"
            variants={container}
          >
            <motion.div variants={item} className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] mb-8">
                <span className="text-gradient-accent">FixFlow</span>
                <br />
                <span className="text-gradient-white">AI-Powered</span>
                <br />
                <span className="text-gradient-white">Data Lineage</span>
                <br />
                <span className="text-gradient-white">Failure Diagnosis</span>
              </h1>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link to="/docs" className="btn-primary text-base px-8 py-4">
                  Get Early Access <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/bot" className="btn-secondary text-base px-8 py-4">
                  See GitHub Bot <GitPullRequest className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>

            <motion.div variants={item} className="flex-1 w-full">
              <div className="glass-strong overflow-hidden animate-float shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
                <div className="flex items-center gap-2 px-5 py-3 bg-white/[0.03] border-b border-white/[0.06]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="ml-3 text-xs font-mono text-text-muted">terminal — fixflow diagnose</span>
                </div>
                <div className="p-6 sm:p-8 font-mono text-sm leading-loose text-left overflow-x-auto">
                  <p className="text-text-muted">$ fixflow analyze --run_id dbt_prod_8273</p>
                  <p className="text-blue-400 mt-3">&gt; Connecting to OpenMetadata...</p>
                  <p className="text-blue-400">&gt; Walking upstream lineage for table 'fct_revenue'...</p>
                  <p className="text-yellow-400 mt-3">! Found anomaly at depth 3: 'stg_stripe_payments'</p>
                  <p className="text-red-400">✗ Breaking Change: Column 'amount_cents' was renamed to 'amount'</p>
                  <p className="text-green-400 mt-4">✓ AI Diagnosis: The recent PR #482 changed the Stripe webhook parsing.</p>
                  <p className="text-green-400 ml-2">→ Update the dbt model 'stg_stripe_payments' to alias 'amount' → 'amount_cents'.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Features Section — flows directly from hero ── */}
      <section className="relative pt-0 pb-24 sm:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-radial-glow-subtle" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Section heading styled like hero */}
          <motion.div
            className="text-center mb-16 sm:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-text-muted text-xs font-mono uppercase tracking-widest mb-4">What makes us different</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.0]">
              <span className="text-gradient-white">Why</span>
              {' '}
              <span className="text-gradient-accent">FixFlow?</span>
            </h2>
            <p className="text-lg text-text-secondary max-w-xl mx-auto mt-5">
              Data pipelines break. Debugging them shouldn't take hours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
          >
            <FeaturesBlock />
          </motion.div>
        </div>
      </section>

      {/* ── Integrations Section ── */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(239,68,68,0.06) 0%, transparent 70%)' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Section heading */}
          <motion.div
            className="text-center mb-16 sm:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-text-muted text-xs font-mono uppercase tracking-widest mb-4">Plug in, not rip out</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.0]">
              <span className="text-gradient-white">Built for</span>
              <br />
              <span className="text-gradient-accent">Modern Data</span>
              <br />
              <span className="text-gradient-white">Stacks</span>
            </h2>
            <p className="text-lg text-text-secondary max-w-xl mx-auto mt-5">
              FixFlow slots into your existing tools in minutes. No rearchitecting. No new platforms.
            </p>
          </motion.div>

          {/* Integration cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {integrations.map((integ, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative flex flex-col gap-4 p-6 rounded-2xl cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid rgba(255,255,255,0.07)`,
                  transition: 'all 0.35s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.border = `1px solid ${integ.color}40`;
                  e.currentTarget.style.boxShadow = `0 0 40px ${integ.color}12`;
                  e.currentTarget.style.background = `rgba(255,255,255,0.05)`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.border = `1px solid rgba(255,255,255,0.07)`;
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.background = `rgba(255,255,255,0.03)`;
                }}
              >
                {/* Badge */}
                <span
                  className="absolute top-4 right-4 text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                  style={{ color: integ.color, background: `${integ.color}15`, border: `1px solid ${integ.color}30` }}
                >
                  {integ.badge}
                </span>

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: `${integ.color}12`, color: integ.color, border: `1px solid ${integ.color}25` }}
                >
                  {integ.icon}
                </div>

                {/* Name + desc */}
                <div>
                  <h3 className="text-base font-bold text-white mb-1">{integ.name}</h3>
                  <p className="text-text-muted text-xs leading-relaxed">{integ.desc}</p>
                </div>

                {/* Bottom status bar */}
                <div className="mt-auto flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5" style={{ color: integ.color }} />
                  <span className="text-xs font-mono" style={{ color: `${integ.color}99` }}>Connected</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(239,68,68,0.08) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(239,68,68,0.2)',
            }}
          >
            <div className="text-center sm:text-left">
              <p className="text-white font-bold text-lg mb-1">More integrations on the way</p>
              <p className="text-text-secondary text-sm">Airflow, Databricks, BigQuery, Fivetran and more.</p>
            </div>
            <Link to="/integrations" className="btn-outline whitespace-nowrap">
              View All Integrations <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

        </div>
      </section>
    </div>
  );
}