import { motion } from 'framer-motion';
import { GitPullRequest, GitMerge, GitBranch, AlertCircle, CheckCircle2, Activity } from 'lucide-react';

export default function BotExplanation() {
  const steps = [
    {
      icon: <GitBranch className="w-5 h-5" />,
      iconColor: 'text-accent',
      title: '1. Developer Pushes Code',
      desc: 'You push a change to a dbt model or table schema. The GitHub Action is triggered automatically.',
    },
    {
      icon: <AlertCircle className="w-5 h-5" />,
      iconColor: 'text-yellow-500',
      title: '2. Schema Diff Detected',
      desc: 'The bot identifies exactly what changed (e.g., column dropped, type changed) by comparing with OpenMetadata.',
    },
    {
      icon: <GitMerge className="w-5 h-5" />,
      iconColor: 'text-accent',
      title: '3. Impact Warning Posted',
      desc: 'A clear, plain-English summary of downstream impacts is posted as a PR comment, blocking the merge if necessary.',
    },
  ];

  return (
    <div className="relative pt-28 sm:pt-32 pb-20 sm:pb-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-radial-subtle" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 divider-glow" />

      <div className="container-max relative z-10">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="badge mb-8"
          >
            <GitPullRequest className="w-4 h-4" />
            GitHub PR Integration
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[0.95] mb-6"
          >
            <span className="text-gradient-white">Catch Schema Breaks</span>
            <br />
            <span className="text-gradient-accent">Before They Merge</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto"
          >
            Our companion GitHub bot intercepts pull requests, runs impact analysis on your schema changes,
            and posts AI-generated warnings directly in your PR comments.
          </motion.p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-gradient-white">How the Bot Works</h3>
            <div className="space-y-6">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.15 }}
                  className="glass group flex gap-4 p-5 cursor-default hover:shadow-glass-hover"
                >
                  <div className={`flex-shrink-0 w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center ${step.iconColor} group-hover:bg-white/[0.06] transition-colors`}>
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-semibold mb-1.5 text-text-primary">{step.title}</h4>
                    <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* PR Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="glass-strong overflow-hidden shadow-glass-hover"
          >
            {/* PR Title Bar */}
            <div className="bg-bg-secondary border-b border-glass-border px-5 py-3.5 flex items-center gap-3">
              <GitPullRequest className="w-5 h-5 text-green-400" />
              <span className="text-text-primary font-semibold text-sm">Refactor stripe payments model</span>
              <span className="text-text-muted text-sm">#142</span>
            </div>

            {/* PR Comment */}
            <div className="p-5 bg-bg-primary/50">
              <div className="flex gap-3.5">
                {/* Bot Avatar */}
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-orange-500 flex items-center justify-center flex-shrink-0 shadow-glow">
                  <Activity className="w-4 h-4 text-white" />
                </div>

                {/* Comment Body */}
                <div className="flex-1 border border-glass-border rounded-lg bg-bg-secondary/50 overflow-hidden min-w-0">
                  <div className="bg-bg-surface px-4 py-2 border-b border-glass-border text-xs text-text-muted">
                    <span className="font-semibold text-text-secondary">fixflow-bot</span> commented 2 minutes ago
                  </div>
                  <div className="p-4 text-text-primary text-sm space-y-3">
                    {/* Warning */}
                    <div className="flex items-center gap-2 text-accent font-semibold text-xs">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>⚠️ Breaking Schema Changes Detected</span>
                    </div>

                    <p className="text-text-secondary text-xs">
                      This PR renames <code className="bg-bg-tertiary px-1 py-0.5 rounded text-accent">customer_id</code> in <code className="bg-bg-tertiary px-1 py-0.5 rounded text-blue-400">stg_stripe_payments</code>.
                    </p>

                    {/* Diff Block */}
                    <div className="bg-bg-tertiary border border-glass-border rounded-md p-3 font-mono text-xs overflow-x-auto">
                      <span className="text-red-400">- customer_id VARCHAR(255)</span>
                      <br />
                      <span className="text-green-400">+ user_id VARCHAR(255)</span>
                    </div>

                    {/* Impact */}
                    <div>
                      <p className="font-semibold text-xs text-text-primary mb-2">Downstream Impact (3 tables):</p>
                      <ul className="space-y-1.5 text-xs text-text-secondary">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                          <span className="text-blue-400">mrt_mrr_daily</span>
                          <span className="text-text-muted">— Dashboard: Executive Summary</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                          <span className="text-blue-400">fct_invoices</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                          <span className="text-blue-400">dim_customers</span>
                        </li>
                      </ul>
                    </div>

                    {/* Fix */}
                    <div className="pt-3 border-t border-glass-border flex items-start gap-2 text-green-400 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                      <span>Suggested Fix: Alias <code className="text-blue-400">user_id</code> → <code className="text-blue-400">customer_id</code> in downstream models.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
