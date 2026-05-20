'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight, CheckCircle, AlertCircle, Zap,
  GitBranch, MessageSquare, Cloud, LogIn,
  HelpCircle, ChevronRight, Database
} from 'lucide-react';

// ── Shared primitives ─────────────────────────────────────────────────────────

const Callout = ({ icon: Icon, color = 'green', title, children }: { icon: any; color?: 'green' | 'yellow' | 'blue'; title?: string; children: React.ReactNode }) => {
  const colors: Record<'green' | 'yellow' | 'blue', { bg: string; border: string; icon: string }> = {
    green:  { bg: 'bg-emerald-500/8',  border: 'border-emerald-500/20', icon: 'text-emerald-400' },
    yellow: { bg: 'bg-amber-500/8',    border: 'border-amber-500/20',   icon: 'text-amber-400'   },
    blue:   { bg: 'bg-blue-500/8',     border: 'border-blue-500/20',    icon: 'text-blue-400'    },
  };
  const c = colors[color as 'green' | 'yellow' | 'blue'];
  return (
    <div className={`p-5 rounded-xl border ${c.bg} ${c.border}`}>
      <div className="flex gap-3">
        <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${c.icon}`} />
        <div className="text-sm">
          {title && <p className="font-semibold text-text-primary mb-1">{title}</p>}
          <div className="text-text-muted leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
};

const Step = ({ n, title, children }: { n: number; title: string; children: React.ReactNode }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-accent/15 border border-accent/25 flex items-center justify-center">
      <span className="text-accent text-xs font-bold">{n}</span>
    </div>
    <div className="pb-6 border-b border-glass-border/50 flex-1 last:border-0 last:pb-0">
      <p className="font-semibold text-text-primary text-sm mb-2">{title}</p>
      <div className="text-sm text-text-secondary leading-relaxed space-y-1">{children}</div>
    </div>
  </div>
);

const Screenshot = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="rounded-xl overflow-hidden border border-glass-border">
    <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.03] border-b border-glass-border">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
      </div>
      <span className="text-xs text-text-muted font-mono ml-2">{label}</span>
    </div>
    <div className="p-5 bg-bg-tertiary text-sm">{children}</div>
  </div>
);

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block text-xs font-medium text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-md">
    {children}
  </span>
);

const Section = ({ id, icon: Icon, title, subtitle, children }: { id: string; icon: any; title: string; subtitle: string; children: React.ReactNode }) => (
  <div id={id} className="border-b border-glass-border">
    <div className="px-8 sm:px-16 py-14">
      <div className="flex items-start gap-4 mb-10">
        <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Icon className="w-4 h-4 text-accent" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-text-primary">{title}</h2>
          <p className="text-text-muted text-sm mt-1">{subtitle}</p>
        </div>
      </div>
      <div className="space-y-6 max-w-2xl">{children}</div>
    </div>
  </div>
);

// ── Nav items ─────────────────────────────────────────────────────────────────

const NAV = [
  { label: 'Overview',              id: 'overview'            },
  { label: 'Create your account',   id: 'create-account'      },
  { label: 'Connect OpenMetadata',  id: 'connect-openmetadata'},
  { label: 'Install the GitHub App',id: 'install-github-app'  },
  { label: 'Your first PR analysis',id: 'first-analysis'      },
  { label: 'Investigations',        id: 'investigations'      },
  { label: 'Troubleshooting',       id: 'troubleshooting'     },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DocsPage() {
  return (
    <div className="relative min-h-screen flex">
      <div className="absolute inset-0 bg-radial-subtle" />

      {/* Sidebar */}
      <aside className="hidden lg:block w-60 flex-shrink-0 sticky top-0 h-screen border-r border-glass-border overflow-y-auto pt-28 pb-10 px-6 relative z-10">
        <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-4">Setup Guide</p>
        <nav className="space-y-0.5">
          {NAV.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              className="block px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-white/[0.04] transition-all"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="mt-10 pt-6 border-t border-glass-border space-y-4">
          <div>
            <p className="text-xs text-text-muted mb-1.5">Platform</p>
            <a href="https://fixflow.io" target="_blank" rel="noreferrer"
              className="text-xs text-accent font-mono flex items-center gap-1 hover:underline">
              fixflow.io <ArrowRight className="w-3 h-3" />
            </a>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-1.5">Status</p>
            <a href="https://status.fixflow.io" target="_blank" rel="noreferrer"
              className="text-xs text-accent font-mono flex items-center gap-1 hover:underline">
              status.fixflow.io <ArrowRight className="w-3 h-3" />
            </a>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-1.5">Support</p>
            <a href="mailto:support@fixflow.io"
              className="text-xs text-accent font-mono flex items-center gap-1 hover:underline">
              support@fixflow.io <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 relative z-10 min-w-0">

        {/* Hero */}
        <div className="px-8 sm:px-16 pt-28 sm:pt-32 pb-14 border-b border-glass-border">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="badge mb-6">
              <Cloud className="w-4 h-4" />
              Getting started
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-[0.95] mb-4">
              <span className="text-gradient-white">Set up FixFlow</span>
            </h1>
            <p className="text-lg text-text-secondary max-w-xl">
              Connect your data sources, install the GitHub bot, and get automatic pipeline failure analysis — in about 10 minutes.
            </p>
            <div className="flex flex-wrap gap-2 mt-8">
              {['No coding required', '~10 min setup', 'Free to start'].map(t => (
                <span key={t} className="text-xs text-text-muted border border-glass-border px-3 py-1.5 rounded-lg">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>

          {/* ── Overview ──────────────────────────────────────────────────── */}
          <Section id="overview" icon={Zap} title="How FixFlow works" subtitle="The big picture before you start">
            <p className="text-sm text-text-secondary">
              FixFlow watches your GitHub repositories for pull requests that touch SQL or data config files.
              When it spots one, it traces the change through your data lineage to find which dashboards,
              reports, and downstream tables will break — and posts the findings directly on the PR before
              anyone has to review it manually.
            </p>

            <div className="space-y-3">
              {[
                { icon: GitBranch,   title: 'Developer opens a PR',           desc: 'Any pull request that edits SQL or YAML data files.' },
                { icon: Zap,         title: 'FixFlow analyses the change',     desc: 'It traces the impact across your entire data lineage automatically.' },
                { icon: MessageSquare, title: 'Comment posted to the PR',      desc: 'Root cause, affected assets, and a suggested fix — right in GitHub.' },
                { icon: CheckCircle, title: 'Team merges with confidence',     desc: 'No surprises after merge. Issues caught before they reach production.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-glass-border">
                  <Icon className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{title}</p>
                    <p className="text-xs text-text-muted mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Callout icon={CheckCircle} color="blue" title="What you'll need">
              An OpenMetadata instance (cloud or self-hosted) with lineage set up for your tables, and a GitHub account with admin access to the repositories you want monitored.
            </Callout>
          </Section>

          {/* ── Create account ────────────────────────────────────────────── */}
          <Section id="create-account" icon={LogIn} title="Create your account" subtitle="Sign up for free — no credit card needed">
            <div className="space-y-4">
              <Step n={1} title="Go to fixflow.io and click 'Start Free'">
                <p>Use your work email — it makes it easier to share access with teammates later.</p>
              </Step>
              <Step n={2} title="Set a password">
                <p>At least 8 characters with one uppercase letter and one number.</p>
              </Step>
              <Step n={3} title="Verify your email">
                <p>Check your inbox for a verification link. It arrives within a minute. Check spam if you don't see it.</p>
              </Step>
              <Step n={4} title="You're in">
                <p>You'll land on your dashboard. Your free account includes 50 investigations per month and one data connection.</p>
              </Step>
            </div>
          </Section>

          {/* ── Connect OpenMetadata ──────────────────────────────────────── */}
          <Section id="connect-openmetadata" icon={Database} title="Connect OpenMetadata" subtitle="Give FixFlow read access to your data lineage">
            <p className="text-sm text-text-secondary">
              FixFlow uses your OpenMetadata instance to understand how your tables and columns are connected.
              It only ever reads this data — it never writes to or modifies your OpenMetadata setup.
            </p>

            <div className="space-y-4">
              <Step n={1} title="Find your OpenMetadata URL">
                <p>This is the web address you use to log in to OpenMetadata. It looks like:</p>
                <div className="mt-2 space-y-1">
                  <p className="font-mono text-xs text-accent bg-accent/5 border border-accent/10 rounded-lg px-3 py-2">https://your-org.openmetadata.cloud</p>
                  <p className="text-xs text-text-muted">or your self-hosted address, e.g. <span className="font-mono text-accent">https://metadata.yourcompany.com</span></p>
                </div>
              </Step>

              <Step n={2} title="Generate a bot token in OpenMetadata">
                <p>FixFlow needs a special read-only token (called a "bot token") to talk to OpenMetadata on your behalf.</p>
                <ol className="mt-3 space-y-2 list-none">
                  {[
                    'Log in to your OpenMetadata instance',
                    'Click the gear icon (⚙️) in the top-right to open Settings',
                    'In the left sidebar, click Integrations → Bots',
                    'Click on "ingestion-bot" (it\'s created by default)',
                    'Click "Show token" and copy the full token',
                  ].map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-text-secondary">
                      <span className="w-4 h-4 rounded-full bg-white/5 border border-glass-border flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {s}
                    </li>
                  ))}
                </ol>

                <Callout icon={CheckCircle} color="blue" title="Bot token vs your login token">
                  Always use the bot token — not your personal login. Bot tokens never expire and work around the clock. Your personal session token expires after an hour.
                </Callout>
              </Step>

              <Step n={3} title="Add the connection in FixFlow">
                <ol className="space-y-2 list-none">
                  {[
                    'In your FixFlow dashboard, go to Settings → Data Sources',
                    'Click "Add Connection" and select OpenMetadata',
                    'Give it a name (e.g. "Production")',
                    'Paste your OpenMetadata URL and bot token',
                    'Click "Test Connection" — you should see a green checkmark',
                    'Click Save',
                  ].map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-text-secondary">
                      <span className="w-4 h-4 rounded-full bg-white/5 border border-glass-border flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {s}
                    </li>
                  ))}
                </ol>
              </Step>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-glass-border text-xs space-y-2">
              <p className="font-semibold text-text-primary">Connection status indicator</p>
              <p className="text-text-secondary"><span className="text-emerald-400">●</span> <strong>Connected</strong> — everything is working</p>
              <p className="text-text-secondary"><span className="text-amber-400">●</span> <strong>Pending</strong> — saved but not yet verified</p>
              <p className="text-text-secondary"><span className="text-red-400">●</span> <strong>Failed</strong> — FixFlow can't reach your instance — see Troubleshooting</p>
            </div>
          </Section>

          {/* ── Install GitHub App ────────────────────────────────────────── */}
          <Section id="install-github-app" icon={GitBranch} title="Install the GitHub App" subtitle="Let FixFlow monitor pull requests in your repositories">
            <p className="text-sm text-text-secondary">
              FixFlow has an official GitHub App that you install directly from GitHub — similar to how you'd
              install any other bot (like Dependabot or CodeClimate). You don't need to create tokens or
              configure webhooks manually.
            </p>

            <div className="space-y-4">
              <Step n={1} title="Start the installation from FixFlow">
                <ol className="space-y-2 list-none">
                  {[
                    'In your FixFlow dashboard, go to Settings → Integrations',
                    'Click on GitHub',
                    'Click "Install GitHub App"',
                    'You\'ll be redirected to GitHub',
                  ].map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-text-secondary">
                      <span className="w-4 h-4 rounded-full bg-white/5 border border-glass-border flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {s}
                    </li>
                  ))}
                </ol>
              </Step>

              <Step n={2} title="Choose where to install it on GitHub">
                <p>GitHub will ask you to pick an account or organisation. Choose the one that owns the repositories you want FixFlow to monitor.</p>

                <Screenshot label="github.com — Install FixFlow">
                  <div className="space-y-3 text-text-secondary">
                    <p className="text-text-primary font-semibold text-sm">Install FixFlow</p>
                    <p className="text-xs text-text-muted">Choose an account to install FixFlow on:</p>
                    <div className="space-y-2">
                      {['your-username', 'your-org'].map(acct => (
                        <div key={acct} className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-white/[0.04] border border-glass-border/60">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-accent/20" />
                            <span className="text-xs font-mono text-text-primary">{acct}</span>
                          </div>
                          <span className="text-xs text-accent">Install →</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Screenshot>
              </Step>

              <Step n={3} title="Select which repositories FixFlow can access">
                <p>You'll be asked to choose between "All repositories" or specific ones. We recommend selecting only the repositories that contain your dbt or SQL data models.</p>

                <Screenshot label="github.com — Repository access">
                  <div className="space-y-3">
                    <p className="text-xs text-text-muted">Repository access</p>
                    <div className="space-y-2">
                      {[
                        { name: '○  All repositories',            sub: 'Includes future repositories' },
                        { name: '●  Only select repositories',    sub: 'Recommended — choose specific repos' },
                      ].map(r => (
                        <div key={r.name} className="px-3 py-2.5 rounded-lg bg-white/[0.04] border border-glass-border/60">
                          <p className="text-xs font-mono text-text-primary">{r.name}</p>
                          <p className="text-xs text-text-muted mt-0.5">{r.sub}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Screenshot>
              </Step>

              <Step n={4} title="Approve the permissions">
                <p>FixFlow requests read access to your code and pull requests, and write access to post comments on PRs. It does not have access to push code, merge PRs, or modify anything in your repository.</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {[
                    { label: 'Read pull requests',  allowed: true  },
                    { label: 'Post PR comments',    allowed: true  },
                    { label: 'Read repository code',allowed: true  },
                    { label: 'Push or merge code',  allowed: false },
                    { label: 'Access secrets',      allowed: false },
                    { label: 'Modify settings',     allowed: false },
                  ].map(({ label, allowed }) => (
                    <div key={label} className="flex items-center gap-2 text-xs text-text-secondary">
                      {allowed
                        ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        : <span className="w-3.5 h-3.5 flex items-center justify-center text-red-400 flex-shrink-0">✕</span>
                      }
                      {label}
                    </div>
                  ))}
                </div>
              </Step>

              <Step n={5} title="You're redirected back to FixFlow">
                <p>Once you approve, GitHub sends you back to FixFlow. Your GitHub connection will show as <span className="text-emerald-400 font-semibold">Connected</span>. You're ready to go.</p>
              </Step>
            </div>

            <Callout icon={AlertCircle} color="yellow" title="Need admin access?">
              Installing a GitHub App requires admin access to the organisation or repository. If you don't have that, ask your GitHub org admin to complete this step — it only takes a minute.
            </Callout>
          </Section>

          {/* ── First analysis ────────────────────────────────────────────── */}
          <Section id="first-analysis" icon={Zap} title="Your first PR analysis" subtitle="What happens when a developer opens a pull request">
            <p className="text-sm text-text-secondary">
              Once the GitHub App is installed and your OpenMetadata connection is active, everything is automatic.
              Here's what happens from the moment a PR is opened.
            </p>

            <div className="space-y-4">
              <Step n={1} title="A developer opens a PR with SQL or config changes">
                <p>FixFlow watches for pull requests that touch <Tag>.sql</Tag> or <Tag>.yml</Tag> files in the connected repositories. Other file types (Python, markdown, etc.) are ignored.</p>
              </Step>

              <Step n={2} title="FixFlow posts an initial comment within seconds">
                <p>As soon as the PR opens, FixFlow posts a placeholder comment so the team knows analysis is running.</p>
              </Step>

              <Step n={3} title="Analysis completes and the comment updates">
                <p>Usually within 2–5 seconds, the comment updates with the full findings:</p>
              </Step>
            </div>

            <Screenshot label="github.com — Pull request #42">
              <div className="space-y-4 font-mono text-xs leading-relaxed text-text-secondary">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex-shrink-0" />
                  <span className="text-text-muted">FixFlow Bot</span>
                  <span className="text-text-muted/50">· just now</span>
                </div>

                <p className="text-accent font-bold text-sm">🔍 FixFlow — impact analysis complete</p>

                <div className="space-y-1">
                  <p className="text-text-primary font-semibold">What changed</p>
                  <p>Column <span className="text-amber-400">user_id</span> renamed to <span className="text-amber-400">customer_id</span> in <span className="text-blue-400">models/orders.sql</span></p>
                </div>

                <div className="space-y-1">
                  <p className="text-text-primary font-semibold">Root cause</p>
                  <p className="text-text-muted pl-3 border-l border-glass-border">3 downstream tables reference the old column name and will break if this PR merges.</p>
                </div>

                <div className="space-y-1">
                  <p className="text-text-primary font-semibold">Affected tables</p>
                  <p className="pl-3"><span className="text-red-400">CRITICAL</span>  stg_orders — 4 references to old column</p>
                  <p className="pl-3"><span className="text-amber-400">HIGH</span>     fact_revenue — 2 references</p>
                  <p className="pl-3"><span className="text-yellow-400">MEDIUM</span>   dim_customer — 1 reference</p>
                </div>

                <div className="space-y-1">
                  <p className="text-text-primary font-semibold">Suggested fix</p>
                  <p className="text-text-muted pl-3 border-l border-glass-border">Update the column references in the 3 affected files before merging.</p>
                </div>

                <p className="text-text-muted pt-1">Confidence: <span className="text-blue-400">92%</span>  ·  Owner: <span className="text-blue-400">data-team@company.com</span></p>
              </div>
            </Screenshot>

            <Callout icon={CheckCircle} color="green" title="Safe to merge?">
              If FixFlow finds no downstream impact, the comment will say "No affected assets detected — safe to merge." You can use this as a green light in your review process.
            </Callout>
          </Section>

          {/* ── Investigations ───────────────────────────────────────────── */}
          <Section id="investigations" icon={MessageSquare} title="Investigations dashboard" subtitle="View and explore past analyses">
            <p className="text-sm text-text-secondary">
              Every PR analysis is saved as an investigation in your FixFlow dashboard. You can browse them,
              filter by severity, and dig into the full lineage graph for any finding.
            </p>

            <div className="space-y-3">
              {[
                { title: 'Investigation list',     desc: 'See every analysis sorted by date. Filter by status (critical / passed / pending).' },
                { title: 'Lineage graph',          desc: 'Click any investigation to see an interactive graph of how the change rippled through your data.' },
                { title: 'Asset details',          desc: 'Click any affected table to see which columns are impacted and who owns them.' },
                { title: 'Manual investigation',   desc: 'You can also start an investigation yourself — paste any asset name from OpenMetadata and ask FixFlow to analyse it.' },
              ].map(({ title, desc }) => (
                <div key={title} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-glass-border">
                  <ChevronRight className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{title}</p>
                    <p className="text-xs text-text-muted mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-glass-border">
              <p className="text-xs font-semibold text-text-primary mb-3">Investigation lifecycle</p>
              <div className="flex items-center gap-2 text-xs flex-wrap">
                {['Received', 'Tracing lineage', 'AI analysis', 'Complete'].map((s, i, arr) => (
                  <span key={s} className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full border border-glass-border text-text-muted bg-white/[0.02]">{s}</span>
                    {i < arr.length - 1 && <ArrowRight className="w-3 h-3 text-text-muted/40" />}
                  </span>
                ))}
              </div>
              <p className="text-xs text-text-muted mt-3">Most investigations complete in 2–5 seconds.</p>
            </div>
          </Section>

          {/* ── Troubleshooting ───────────────────────────────────────────── */}
          <Section id="troubleshooting" icon={HelpCircle} title="Troubleshooting" subtitle="Something not working? Start here">

            <div className="space-y-3">
              {[
                {
                  title: 'FixFlow can\'t connect to OpenMetadata',
                  steps: [
                    'Check that your OpenMetadata instance is online and accessible',
                    'Go to Settings → Data Sources and click "Test" next to your connection',
                    'Make sure you used the bot token, not your personal login token',
                    'If your OpenMetadata is self-hosted, check that FixFlow\'s IP is not blocked by a firewall',
                  ],
                },
                {
                  title: 'No PR comment is appearing',
                  steps: [
                    'Make sure the PR edits at least one .sql or .yml file — other file types are skipped',
                    'Check that the GitHub App is still installed: go to github.com → Settings → Applications',
                    'Verify the repository is one you selected during installation',
                    'Check the FixFlow status page for any ongoing incidents',
                  ],
                },
                {
                  title: '"No lineage found" on an asset',
                  steps: [
                    'Open the asset in OpenMetadata and confirm it has lineage data attached',
                    'If lineage is missing, you may need to run your dbt or ingestion pipeline in OpenMetadata first',
                    'Check that you\'re using the exact asset name as it appears in OpenMetadata',
                  ],
                },
                {
                  title: 'GitHub App was accidentally uninstalled',
                  steps: [
                    'Go to github.com → your org → Settings → GitHub Apps',
                    'Click "Install" next to FixFlow to re-install it',
                    'Or go to Settings → Integrations in FixFlow and click "Reinstall GitHub App"',
                  ],
                },
              ].map(({ title, steps }) => (
                <div key={title} className="p-4 rounded-xl bg-white/[0.02] border border-glass-border">
                  <p className="font-semibold text-text-primary text-sm mb-3 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    {title}
                  </p>
                  <ol className="space-y-1.5">
                    {steps.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-text-secondary">
                        <span className="text-text-muted/50 flex-shrink-0 w-3">{i + 1}.</span>
                        {s}
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>

            <Callout icon={MessageSquare} color="blue" title="Still stuck?">
              <div className="space-y-1">
                <p>Chat with us using the <strong>?</strong> button inside the dashboard.</p>
                <p>Email us at <a href="mailto:support@fixflow.io" className="text-accent underline">support@fixflow.io</a> — we typically reply within a few hours.</p>
              </div>
            </Callout>
          </Section>

          {/* Footer CTA */}
          <div className="px-8 sm:px-16 py-16 text-center">
            <h3 className="text-2xl font-bold mb-3 text-text-primary">Ready to catch pipeline failures before they merge?</h3>
            <p className="text-text-secondary text-sm mb-7 max-w-md mx-auto">
              Free account, no credit card required. Takes about 10 minutes to set up from scratch.
            </p>
            <a
              href="https://app.fixflow.io/signup"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-bg-primary font-semibold text-sm hover:bg-accent/90 transition-colors"
            >
              Start free <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </motion.div>
      </main>
    </div>
  );
}