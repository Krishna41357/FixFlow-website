import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useForm } from '@formspree/react';

const STACK_OPTIONS = ['dbt', 'Snowflake', 'BigQuery', 'Airflow', 'Databricks', 'OpenMetadata', 'Fivetran', 'Redshift'];

const ROLES = [
  'Data Engineer',
  'Analytics Engineer',
  'Data Scientist',
  'Engineering Manager',
  'Head of Data / VP',
  'Founder / CTO',
  'Other',
];

export default function EarlyAccess() {
  const [stack, setStack] = useState<string[]>([]);

  // Formspree
  const [state, handleSubmit] = useForm("mdajolbo");

  const toggleStack = (tool: string) => {
    setStack(prev =>
      prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool]
    );
  };

  if (state.succeeded) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: '#1a0808', border: '1px solid #3a1010' }}>
            <CheckCircle2 className="w-8 h-8 text-red-500" />
          </div>

          <h2 className="text-3xl font-black text-white mb-4">
            You're on the list
          </h2>

          <p className="text-neutral-400 leading-relaxed mb-8">
            Thanks for applying. We personally review every submission and will reach out within 48 hours.
          </p>

          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-mono text-red-500 hover:text-red-400 transition-colors"
          >
            Back to home <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative pt-28 pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 0%, rgba(239,68,68,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
            style={{
              color: '#ef4444',
              background: '#1a0808',
              border: '1px solid #3a1010',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Early access
          </span>

          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
            Join the waitlist
          </h1>

          <p className="text-neutral-400 text-base leading-relaxed max-w-md mx-auto">
            Tell us about your stack — we prioritize teams where FixFlow will have the most impact.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-2xl p-8 sm:p-10"
          style={{ background: '#111', border: '1px solid #1e1e1e' }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
                  First name
                </label>

                <input
                  type="text"
                  name="firstName"
                  required
                  placeholder="Ada"
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-neutral-600 outline-none transition-colors"
                  style={{ background: '#0d0d0d', border: '1px solid #2a2a2a' }}
                  onFocus={e => (e.target.style.borderColor = '#ef4444')}
                  onBlur={e => (e.target.style.borderColor = '#2a2a2a')}
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
                  Last name
                </label>

                <input
                  type="text"
                  name="lastName"
                  required
                  placeholder="Lovelace"
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-neutral-600 outline-none transition-colors"
                  style={{ background: '#0d0d0d', border: '1px solid #2a2a2a' }}
                  onFocus={e => (e.target.style.borderColor = '#ef4444')}
                  onBlur={e => (e.target.style.borderColor = '#2a2a2a')}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
                Work email
              </label>

              <input
                type="email"
                name="email"
                required
                placeholder="ada@company.com"
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-neutral-600 outline-none transition-colors"
                style={{ background: '#0d0d0d', border: '1px solid #2a2a2a' }}
                onFocus={e => (e.target.style.borderColor = '#ef4444')}
                onBlur={e => (e.target.style.borderColor = '#2a2a2a')}
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
                Company
              </label>

              <input
                type="text"
                name="company"
                required
                placeholder="Acme Corp"
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-neutral-600 outline-none transition-colors"
                style={{ background: '#0d0d0d', border: '1px solid #2a2a2a' }}
                onFocus={e => (e.target.style.borderColor = '#ef4444')}
                onBlur={e => (e.target.style.borderColor = '#2a2a2a')}
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
                Your role
              </label>

              <select
                name="role"
                required
                className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-colors appearance-none cursor-pointer"
                style={{ background: '#0d0d0d', border: '1px solid #2a2a2a' }}
                onFocus={e => (e.target.style.borderColor = '#ef4444')}
                onBlur={e => (e.target.style.borderColor = '#2a2a2a')}
              >
                <option value="">Select your role</option>

                {ROLES.map(r => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Hidden stack input */}
            <input
              type="hidden"
              name="stack"
              value={stack.join(', ')}
            />

            {/* Stack toggle chips */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3">
                Current data stack{' '}
                <span className="normal-case text-neutral-600 font-normal">
                  (select all that apply)
                </span>
              </label>

              <div className="flex flex-wrap gap-2">
                {STACK_OPTIONS.map(tool => {
                  const active = stack.includes(tool);

                  return (
                    <button
                      key={tool}
                      type="button"
                      onClick={() => toggleStack(tool)}
                      className="px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all duration-200"
                      style={{
                        background: active ? '#ef4444' : '#1a0808',
                        border: `1px solid ${active ? '#ef4444' : '#3a1010'}`,
                        color: active ? '#fff' : '#ef4444',
                      }}
                    >
                      {tool}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Team size */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
                Data team size
              </label>

              <select
                name="teamSize"
                className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-colors appearance-none cursor-pointer"
                style={{ background: '#0d0d0d', border: '1px solid #2a2a2a' }}
                onFocus={e => (e.target.style.borderColor = '#ef4444')}
                onBlur={e => (e.target.style.borderColor = '#2a2a2a')}
              >
                <option value="Just me">Just me</option>
                <option value="2–5">2–5</option>
                <option value="6–15">6–15</option>
                <option value="16–50">16–50</option>
                <option value="50+">50+</option>
              </select>
            </div>

            {/* Pain point */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
                Biggest pipeline pain point{' '}
                <span className="normal-case text-neutral-600 font-normal">
                  (optional)
                </span>
              </label>

              <textarea
                rows={4}
                name="painPoint"
                placeholder="e.g. We spend 4+ hours every week debugging dbt failures and tracing broken lineage..."
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-neutral-600 outline-none transition-colors resize-none"
                style={{ background: '#0d0d0d', border: '1px solid #2a2a2a' }}
                onFocus={e => (e.target.style.borderColor = '#ef4444')}
                onBlur={e => (e.target.style.borderColor = '#2a2a2a')}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={state.submitting}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-base text-white transition-opacity"
              style={{
                background: '#ef4444',
                opacity: state.submitting ? 0.7 : 1,
                letterSpacing: '.02em',
              }}
            >
              {state.submitting ? (
                <>
                  <svg
                    className="animate-spin w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>

                  Submitting...
                </>
              ) : (
                <>
                  Submit application
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <p className="text-center text-xs font-mono text-neutral-600">
              We'll reply within 48 hours · No credit card required
            </p>

          </form>
        </motion.div>
      </div>
    </div>
  );
}