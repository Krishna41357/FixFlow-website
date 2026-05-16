'use client';

import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { Activity, Database, Server, AlertTriangle, CheckCircle } from 'lucide-react';

// Fade in → hold → fade out
function useSmoothStep(
  sv: MotionValue<number>,
  inStart: number,
  inEnd: number,
  outStart: number,
  outEnd: number
) {
  const raw = useTransform(sv, [inStart, inEnd, outStart, outEnd], [0, 1, 1, 0]);
  return useSpring(raw, { stiffness: 60, damping: 20, mass: 0.8 });
}

// Step 1 only: visible from the very start, only fades out
function useFadeOut(sv: MotionValue<number>, outStart: number, outEnd: number) {
  const raw = useTransform(sv, [0, outStart, outEnd], [1, 1, 0]);
  return useSpring(raw, { stiffness: 60, damping: 20, mass: 0.8 });
}

export default function Walkthrough() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Step 1: always visible at load, fades out as user scrolls
  const op1 = useFadeOut(scrollYProgress, 0.18, 0.28);
  // Steps 2-4: fade in → hold → fade out
  const op2 = useSmoothStep(scrollYProgress, 0.24, 0.34, 0.46, 0.56);
  const op3 = useSmoothStep(scrollYProgress, 0.50, 0.60, 0.72, 0.82);
  const op4 = useSmoothStep(scrollYProgress, 0.76, 0.88, 1.0, 1.0);

  // Background hue morphs across scroll
  const bgHue = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0, 220, 260, 140]);
  const bgStyle = useTransform(
    bgHue,
    (h: number) =>
      `radial-gradient(ellipse 80% 70% at 50% 50%, hsl(${h},55%,6%) 0%, hsl(${h + 20},40%,3%) 60%, hsl(0,0%,2%) 100%)`
  );
  const ringStyle = useTransform(
    bgHue,
    (h: number) => `radial-gradient(circle, hsl(${h},70%,40%) 0%, transparent 70%)`
  );

  // Step motion values (all at top level — no hooks inside JSX)
  const y1 = useSpring(useTransform(scrollYProgress, [0.16, 0.30], [0, -60]), { stiffness: 50, damping: 18 });
  const s2 = useSpring(useTransform(scrollYProgress, [0.24, 0.36], [0.92, 1]), { stiffness: 55, damping: 18 });
  const x3 = useSpring(useTransform(scrollYProgress, [0.50, 0.62], [-70, 0]), { stiffness: 55, damping: 18 });
  const s4 = useSpring(useTransform(scrollYProgress, [0.76, 0.90], [0.92, 1]), { stiffness: 55, damping: 18 });

  return (
    <div ref={containerRef} className="h-[400vh] relative">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* Morphing background */}
        <motion.div className="absolute inset-0" style={{ background: bgStyle }} />

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Ambient glow ring */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 600,
            height: 600,
            left: '50%',
            top: '50%',
            translateX: '-50%',
            translateY: '-50%',
            background: ringStyle,
            opacity: 0.08,
          }}
        />

        {/* ════════════ STEP 1 — Pipeline Broken ════════════ */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: op1, y: y1 }}
        >
          <motion.div
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-red-500/30 flex items-center justify-center mb-8"
            style={{ background: 'rgba(239,68,68,0.08)' }}
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
          >
            <AlertTriangle className="w-14 h-14 sm:w-16 sm:h-16 text-red-400" />
          </motion.div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            Pipeline Broken
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white/50 max-w-2xl">
            A dbt test failed. Your dashboard is empty. You have 100+ models. Where do you start?
          </p>

          <div className="mt-14 flex flex-col items-center gap-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
            </motion.div>
            <span className="text-xs text-white/30 uppercase tracking-[0.3em]">Scroll to diagnose</span>
          </div>
        </motion.div>

        {/* ════════════ STEP 2 — Walking the Lineage ════════════ */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: op2, scale: s2 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-12 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            Walking the Lineage
          </h2>

          <div className="relative w-full max-w-3xl flex items-center justify-between px-4">
            <div className="flex flex-col gap-3 z-10">
              <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/[0.05] border border-white/10 text-sm font-medium text-white/80 backdrop-blur">
                <Database className="w-4 h-4 text-blue-400" />
                <span className="hidden sm:inline">stg_users</span>
              </div>
              <div className="relative flex items-center gap-2 px-4 py-3 rounded-2xl bg-red-500/10 border border-red-500/40 text-sm font-medium text-white/80 backdrop-blur">
                <Database className="w-4 h-4 text-red-400" />
                <span className="hidden sm:inline">stg_payments</span>
                <motion.div
                  className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-red-500"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1.3, ease: 'easeInOut' }}
                />
              </div>
            </div>

            <div className="flex-1 relative mx-4 sm:mx-8 z-0 h-24">
              <svg
                className="absolute inset-0 w-full h-full overflow-visible"
                viewBox="0 0 200 96"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="lg2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0.15" />
                  </linearGradient>
                </defs>
                <path d="M 0 30 Q 100 30 200 48" stroke="url(#lg1)" strokeWidth="1.5" fill="none" />
                <path d="M 0 66 Q 100 66 200 48" stroke="url(#lg2)" strokeWidth="1.5" fill="none" />
                <circle r="4" fill="#ef4444" opacity="0.9">
                  <animateMotion dur="1.8s" repeatCount="indefinite" path="M 0 66 Q 100 66 200 48" />
                </circle>
              </svg>
            </div>

            <div className="z-10">
              <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/[0.05] border border-white/10 text-sm font-medium text-white/80 backdrop-blur">
                <Server className="w-4 h-4 text-purple-400" />
                <span className="hidden sm:inline">fct_revenue</span>
              </div>
            </div>
          </div>

          <p className="text-base sm:text-lg text-white/50 max-w-xl mt-12">
            FixFlow uses OpenMetadata to trace the error upstream,
            checking schemas and tests at every node.
          </p>
        </motion.div>

        {/* ════════════ STEP 3 — AI Diagnosis ════════════ */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6"
          style={{ opacity: op3, x: x3 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-10 text-center bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            AI Root Cause Analysis
          </h2>

          <div className="w-full max-w-3xl rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-xl p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500/0 via-orange-400 to-orange-500/0" />
            <div className="flex items-start gap-5">
              <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                <Activity className="w-5 h-5 text-orange-400" />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg sm:text-xl font-bold mb-4 text-white">Diagnosis Complete</h3>
                <div className="space-y-3 text-white/60 text-sm sm:text-base leading-relaxed">
                  <p>
                    <span className="text-white/90 font-medium">Root Cause: </span>
                    Column{' '}
                    <code className="mx-1 px-2 py-0.5 rounded bg-white/[0.06] border border-white/[0.08] text-orange-300 text-sm">amount</code>
                    {' '}was renamed to{' '}
                    <code className="mx-1 px-2 py-0.5 rounded bg-white/[0.06] border border-white/[0.08] text-orange-300 text-sm">amount_cents</code>
                  </p>
                  <p>
                    <span className="text-white/90 font-medium">Impact: </span>
                    Broke downstream model <code className="text-white/50">fct_revenue</code> during the 2:00 AM dbt run.
                  </p>
                  <div className="mt-4 p-4 rounded-xl bg-white/[0.04] border border-green-500/20">
                    <p className="flex items-center gap-2 text-green-400 font-medium text-sm mb-2">
                      <CheckCircle className="w-4 h-4" /> Solution
                    </p>
                    <p className="text-sm text-white/60">
                      Update <code className="text-white/50">fct_revenue.sql</code> to use{' '}
                      <code className="text-orange-300">amount_cents / 100</code> instead of{' '}
                      <code className="text-orange-300">amount</code>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ════════════ STEP 4 — Fixed ════════════ */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: op4, scale: s4 }}
        >
          <motion.div
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border border-green-500/30 flex items-center justify-center mb-8"
            style={{ background: 'rgba(34,197,94,0.08)' }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
          >
            <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-green-400" />
          </motion.div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            Fixed in Minutes
          </h2>
          <p className="text-lg sm:text-xl text-white/50 max-w-xl mb-12">
            No more manual hunting. No more frantic Slack messages.
            FixFlow gives you the exact answer instantly.
          </p>
          <a
            href="/docs"
            className="px-10 py-4 rounded-2xl font-semibold text-base bg-white text-black hover:bg-white/90 transition-colors"
          >
            Start Debugging Faster
          </a>
        </motion.div>

      </div>
    </div>
  );
}