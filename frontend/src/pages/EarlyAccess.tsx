import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useForm } from '@formspree/react';
import { Link } from 'react-router-dom';

const STACK_OPTIONS = ['OpenMetadata'];

const ROLES = [
  'Data Engineer',
  'Analytics Engineer',
  'Data Scientist',
  'Engineering Manager',
  'Head of Data / VP',
  'Founder / CTO',
  'Other',
];

const inputStyle = {
  base: {
    background: '#181c27',
    border: '1px solid #2a3050',
  },
  focus: { borderColor: '#ef4444' },
  blur: { borderColor: '#2a3050' },
};

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 mb-1.5">
        {label}
        {hint && <span className="normal-case font-normal text-slate-600">{hint}</span>}
      </label>
      {children}
    </div>
  );
}

export default function EarlyAccess() {
  const [stack, setStack] = useState<string[]>(['OpenMetadata']);
  const [state, handleSubmit] = useForm("mdajolbo");

  const toggleStack = (tool: string) => {
    setStack(prev => prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool]);
  };

  if (state.succeeded) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-sm"
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: '#1a0808', border: '1px solid #3a1010' }}
          >
            <CheckCircle2 className="w-7 h-7 text-red-500" />
          </div>
          <h2 className="text-2xl font-black text-white mb-3">You're on the list</h2>
          <p className="text-neutral-400 text-sm leading-relaxed mb-6">
            Thanks for applying. We personally review every submission and will reach out within 48 hours.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-red-500 hover:text-red-400 transition-colors"
          >
            Back to home <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative pt-24 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 50% 0%, rgba(239,68,68,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{ color: '#ef4444', background: '#1a0808', border: '1px solid #3a1010' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Early access
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-3">
            Join the waitlist
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
             we're currently onboarding teams running OpenMetadata and will prioritize where FixFlow has the most impact.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl p-6 sm:p-8"
          style={{ background: '#0f1117', border: '1px solid #1e2236' }}
        >
          <form onSubmit={handleSubmit}>

            {/* Row 1 — Name × 2 + Email + Company (4 cols on lg, 2 on sm, 1 on xs) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
              <Field label="First name">
                <input
                  type="text"
                  name="firstName"
                  required
                  placeholder="Ada"
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder:text-slate-600 outline-none transition-colors"
                  style={inputStyle.base}
                  onFocus={e => Object.assign(e.target.style, inputStyle.focus)}
                  onBlur={e => Object.assign(e.target.style, inputStyle.blur)}
                />
              </Field>
              <Field label="Last name">
                <input
                  type="text"
                  name="lastName"
                  required
                  placeholder="Lovelace"
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder:text-slate-600 outline-none transition-colors"
                  style={inputStyle.base}
                  onFocus={e => Object.assign(e.target.style, inputStyle.focus)}
                  onBlur={e => Object.assign(e.target.style, inputStyle.blur)}
                />
              </Field>
              <Field label="Work email">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="ada@company.com"
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder:text-slate-600 outline-none transition-colors"
                  style={inputStyle.base}
                  onFocus={e => Object.assign(e.target.style, inputStyle.focus)}
                  onBlur={e => Object.assign(e.target.style, inputStyle.blur)}
                />
              </Field>
              <Field label="Company">
                <input
                  type="text"
                  name="company"
                  required
                  placeholder="Acme Corp"
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder:text-slate-600 outline-none transition-colors"
                  style={inputStyle.base}
                  onFocus={e => Object.assign(e.target.style, inputStyle.focus)}
                  onBlur={e => Object.assign(e.target.style, inputStyle.blur)}
                />
              </Field>
            </div>

            {/* Row 2 — Role + Team size + Stack chips (chips span remaining cols) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
              <Field label="Your role">
                <select
                  name="role"
                  required
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none transition-colors appearance-none cursor-pointer"
                  style={inputStyle.base}
                  onFocus={e => Object.assign(e.target.style, inputStyle.focus)}
                  onBlur={e => Object.assign(e.target.style, inputStyle.blur)}
                >
                  <option value="">Select role</option>
                  {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </Field>
              <Field label="Team size">
                <select
                  name="teamSize"
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none transition-colors appearance-none cursor-pointer"
                  style={inputStyle.base}
                  onFocus={e => Object.assign(e.target.style, inputStyle.focus)}
                  onBlur={e => Object.assign(e.target.style, inputStyle.blur)}
                >
                  <option value="Just me">Just me</option>
                  <option value="2–5">2–5</option>
                  <option value="6–15">6–15</option>
                  <option value="16–50">16–50</option>
                  <option value="50+">50+</option>
                </select>
              </Field>

              {/* Stack chips — spans 2 cols on lg */}
              <div className="sm:col-span-2 lg:col-span-2">
                <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 mb-1.5">
                  Integration
                  <span className="normal-case font-normal text-slate-600">(currently supported)</span>
                </label>
                <input type="hidden" name="stack" value={stack.join(', ')} />
                <div className="flex flex-wrap gap-1.5">
                  {STACK_OPTIONS.map(tool => {
                    const active = stack.includes(tool);
                    return (
                      <button
                        key={tool}
                        type="button"
                        onClick={() => toggleStack(tool)}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all duration-150"
                        style={{
                          background: active ? '#ef4444' : '#181c27',
                          border: `1px solid ${active ? '#ef4444' : '#2a3050'}`,
                          color: active ? '#fff' : '#94a3b8',
                        }}
                      >
                        {tool}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Row 3 — Pain point + Submit side by side on lg */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 items-end">
              <div className="lg:col-span-2">
                <Field label="Biggest pain point" hint="(optional)">
                  <textarea
                    rows={2}
                    name="painPoint"
                    placeholder="e.g. We spend 4+ hours every week debugging dbt failures..."
                    className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder:text-slate-600 outline-none transition-colors resize-none"
                    style={inputStyle.base}
                    onFocus={e => Object.assign(e.target.style, inputStyle.focus)}
                    onBlur={e => Object.assign(e.target.style, inputStyle.blur)}
                  />
                </Field>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110 active:scale-[0.99]"
                  style={{
                    background: '#ef4444',
                    opacity: state.submitting ? 0.7 : 1,
                    letterSpacing: '.02em',
                  }}
                >
                  {state.submitting ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit application
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <p className="text-center text-xs font-mono text-slate-600">
                  48 hr reply · No credit card
                </p>
              </div>
            </div>

          </form>
        </motion.div>
      </div>
    </div>
  );
}