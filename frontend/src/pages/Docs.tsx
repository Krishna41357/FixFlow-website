import { motion } from 'framer-motion';
import {
  BookOpen, Terminal, Code, ArrowRight, Copy,
  Shield, Server, MessageSquare, ChevronDown, ChevronRight, GitBranch
} from 'lucide-react';
import { useState } from 'react';

const CodeBlock = ({ code, lang = 'bash', id }: { code: string; lang?: string; id: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="rounded-xl overflow-hidden border border-glass-border">
      <div className="flex items-center justify-between px-4 py-2 bg-white/[0.02] border-b border-glass-border">
        <span className="text-xs font-mono text-text-muted">{lang}</span>
        <button onClick={copy} className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text-primary transition-colors">
          <Copy className="w-3.5 h-3.5" />
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-5 bg-bg-tertiary font-mono text-sm leading-relaxed overflow-x-auto text-text-primary whitespace-pre">{code}</pre>
    </div>
  );
};

const Section = ({ id, icon: Icon, title, subtitle, children }: {
  id: string; icon: any; title: string; subtitle: string; children: React.ReactNode;
}) => (
  <div id={id} className="border-b border-glass-border">
    <div className="px-8 sm:px-16 py-14">
      <div className="flex items-start gap-4 mb-8">
        <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Icon className="w-4 h-4 text-accent" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-text-muted text-sm mt-1">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  </div>
);

const EndpointRow = ({ method, path, desc, auth, body }: {
  method: string; path: string; desc: string; auth: boolean; body: string | null;
}) => {
  const [open, setOpen] = useState(false);
  const methodColors: Record<string, string> = {
    GET: 'text-purple-400 bg-purple-400/10',
    POST: 'text-green-400 bg-green-400/10',
    PUT: 'text-yellow-400 bg-yellow-400/10',
    DELETE: 'text-red-400 bg-red-400/10',
  };
  return (
    <div className="border border-glass-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors text-left"
      >
        <span className={`px-2.5 py-0.5 rounded font-mono text-xs font-bold flex-shrink-0 ${methodColors[method]}`}>{method}</span>
        <code className="font-mono text-sm text-text-primary flex-1">{path}</code>
        {auth && <span className="text-xs text-text-muted border border-glass-border px-2 py-0.5 rounded flex-shrink-0">Bearer</span>}
        {open ? <ChevronDown className="w-4 h-4 text-text-muted flex-shrink-0" /> : <ChevronRight className="w-4 h-4 text-text-muted flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-glass-border pt-4 space-y-4">
          <p className="text-sm text-text-secondary">{desc}</p>
          {body && <CodeBlock id={`ep-${path}`} lang={body.trim().startsWith('{') ? 'json' : 'bash'} code={body} />}
        </div>
      )}
    </div>
  );
};

export default function Docs() {
  const navItems = ['Installation', 'Authentication', 'Webhooks', 'Investigations', 'Chat', 'GitHub Bot', 'Configuration'];

  const authEndpoints = [
    {
      method: 'POST', path: '/api/v1/users/register', auth: false,
      desc: 'Create a new user account. Returns a JWT access token immediately.',
      body: `{\n  "email": "user@example.com",\n  "username": "myuser",\n  "password": "Testpass123",\n  "full_name": "Optional Name"\n}`,
    },
    {
      method: 'POST', path: '/api/v1/users/login', auth: false,
      desc: 'Authenticate via query parameters (not request body). Returns a JWT access token.',
      body: `POST /api/v1/users/login?email=user@example.com&password=Testpass123`,
    },
    {
      method: 'GET', path: '/api/v1/users/me', auth: true,
      desc: "Returns the currently authenticated user's profile.",
      body: null,
    },
  ];

  const connectionEndpoints = [
    {
      method: 'POST', path: '/api/v1/connections', auth: true,
      desc: 'Save an OpenMetadata workspace connection. The server will ping your OpenMetadata instance to verify the token before saving.',
      body: `{\n  "workspace_name": "Production",\n  "openmetadata_url": "https://metadata.company.com",\n  "openmetadata_token": "eyJ...",\n  "github_repo": "owner/repo"\n}`,
    },
    {
      method: 'GET', path: '/api/v1/connections', auth: true,
      desc: 'List all connections for the authenticated user. Tokens are masked in responses.',
      body: null,
    },
    {
      method: 'DELETE', path: '/api/v1/connections/{id}', auth: true,
      desc: 'Soft-delete a connection. Orphaned investigations are marked accordingly.',
      body: null,
    },
  ];

  const webhookEndpoints = [
    {
      method: 'POST', path: '/api/v1/events/dbt-webhook', auth: false,
      desc: 'Trigger an investigation from a dbt Cloud run failure. Pass connection_id and user_id as query params. Returns 202 immediately — investigation runs in background.',
      body: `POST /api/v1/events/dbt-webhook?connection_id=X&user_id=Y\n\n{\n  "data": {\n    "run_id": "abc123",\n    "node_id": "model.proj.orders",\n    "error_message": "Relation does not exist",\n    "status": "error"\n  }\n}`,
    },
    {
      method: 'POST', path: '/api/v1/github/webhook', auth: false,
      desc: 'Receive GitHub PR events. Validates X-Hub-Signature-256 HMAC, parses .sql/.yml diffs, runs investigation, and posts a comment on the PR.',
      body: `POST /api/v1/github/webhook?connection_id=X&user_id=Y\nHeaders: X-Hub-Signature-256: sha256=<hmac>`,
    },
    {
      method: 'POST', path: '/api/v1/events/manual-query', auth: true,
      desc: 'Manually trigger an investigation from your own tooling.',
      body: `{\n  "connection_id": "507f1f77bcf86cd799439011",\n  "asset_fqn": "snowflake.prod.orders",\n  "failure_query": "Why are values NULL?"\n}`,
    },
  ];

  const investigationEndpoints = [
    {
      method: 'POST', path: '/api/v1/investigations', auth: true,
      desc: 'Create an investigation. user_id is extracted from the JWT token — do not pass it as a param.',
      body: `POST /api/v1/investigations?connection_id=X&event_id=Y&failure_message=error+message\n# -> { "investigation_id": "507f...", "status": "PENDING" }`,
    },
    {
      method: 'GET', path: '/api/v1/investigations/{id}/status', auth: true,
      desc: 'Poll investigation progress. Returns FAILED if OpenMetadata is unreachable — expected in local dev.',
      body: `# Response when complete:\n{\n  "investigation_id": "507f...",\n  "status": "COMPLETED",\n  "root_cause": {\n    "one_line_summary": "Column user_id renamed upstream",\n    "break_point_fqn": "raw.users",\n    "affected_assets": [...],\n    "suggested_fixes": [...],\n    "confidence": 0.92\n  }\n}`,
    },
    {
      method: 'GET', path: '/api/v1/investigations/{id}', auth: true,
      desc: 'Fetch a completed investigation with full lineage subgraph and root cause details.',
      body: null,
    },
  ];

  const chatEndpoints = [
    {
      method: 'POST', path: '/api/v1/chats', auth: true,
      desc: 'Create a new chat session.',
      body: `POST /api/v1/chats?title=Orders+Issue\n# -> { "session_id": "507f...", "title": "Orders Issue" }`,
    },
    {
      method: 'POST', path: '/api/v1/chats/{id}/query', auth: true,
      desc: 'Send a message. Follow-up questions (why, how, fix, impact, etc.) are answered from cached investigation data without re-traversing lineage.',
      body: `{\n  "message": "Why is orders_daily failing?",\n  "asset_fqn": "snowflake.prod.orders_daily"\n}\n\n# Response:\n{\n  "session_id": "507f...",\n  "message": "Based on lineage analysis...",\n  "is_followup": false,\n  "investigation_id": "507f..."\n}`,
    },
    {
      method: 'GET', path: '/api/v1/chats/{id}', auth: true,
      desc: 'Fetch a session with full message history.',
      body: null,
    },
  ];

  return (
    <div className="relative min-h-screen flex">
      <div className="absolute inset-0 bg-radial-subtle" />

      {/* Sidebar */}
      <aside className="hidden lg:block w-60 flex-shrink-0 sticky top-0 h-screen border-r border-glass-border overflow-y-auto pt-28 pb-10 px-6 relative z-10">
        <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-4">On this page</p>
        <nav className="space-y-0.5">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="block px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-white/[0.04] transition-all"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="mt-10 pt-6 border-t border-glass-border space-y-4">
          <div>
            <p className="text-xs text-text-muted mb-2">Base URL</p>
            <code className="text-xs text-accent font-mono block bg-accent/5 border border-accent/10 rounded-lg px-3 py-2 leading-relaxed">
              http://localhost:8000<br />
              <span className="text-text-muted">/api/v1</span>
            </code>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-2">Interactive docs</p>
            <a href="http://localhost:8000/api/docs" target="_blank" rel="noreferrer"
              className="text-xs text-accent font-mono flex items-center gap-1 hover:underline">
              /api/docs <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 relative z-10 min-w-0">

        {/* Header */}
        <div className="px-8 sm:px-16 pt-28 sm:pt-32 pb-14 border-b border-glass-border">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="badge mb-6">
              <BookOpen className="w-4 h-4" />
              API Reference
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[0.95] mb-4">
              <span className="text-gradient-white">Integration Guide</span>
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl">
              Connect Pipeline Autopsy to your data stack — webhooks, investigations, chat sessions, and the GitHub PR bot.
            </p>
            <div className="flex flex-wrap gap-2 mt-8">
              {['FastAPI · Python 3.10+', 'MongoDB', 'OpenMetadata', 'Claude / GPT / Groq'].map((t) => (
                <span key={t} className="text-xs font-mono text-text-muted border border-glass-border px-3 py-1.5 rounded-lg">{t}</span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>

          {/* Installation */}
          <Section id="installation" icon={Terminal} title="Installation" subtitle="Get the server running locally">
            <div className="space-y-5">
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { n: '1', t: 'Install dependencies', s: 'conda + pip' },
                  { n: '2', t: 'Configure .env', s: 'keys & DB URI' },
                  { n: '3', t: 'Run server', s: 'localhost:8000' },
                ].map((s) => (
                  <div key={s.n} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-glass-border">
                    <span className="w-7 h-7 rounded-full bg-accent/15 text-accent text-xs font-black flex items-center justify-center flex-shrink-0">{s.n}</span>
                    <div>
                      <p className="font-semibold text-sm">{s.t}</p>
                      <p className="text-text-muted text-xs">{s.s}</p>
                    </div>
                  </div>
                ))}
              </div>

              <CodeBlock id="install" lang="bash" code={`# Python 3.14 on Windows — install numpy via conda first
conda install numpy -y

# Install remaining dependencies (binary wheels only)
cd server
pip install -r requirements.txt --only-binary=:all:`} />

              <div className="p-4 rounded-xl bg-white/[0.02] border border-glass-border text-xs text-text-secondary leading-relaxed">
                <span className="text-text-primary font-semibold">Python 3.14 note — </span>
                numpy, pydantic, and bcrypt have no pre-built wheels for Py3.14. Always install numpy via conda first, then use <code className="text-accent">--only-binary=:all:</code> for the rest. Plain <code className="text-accent">pip install -r requirements.txt</code> will fail to compile.
              </div>

              <CodeBlock id="run" lang="bash" code={`# Verify MongoDB is running
mongosh --eval "db.adminCommand('ping')"

# Start the server
python app.py

# Verify
curl http://localhost:8000/health
# { "status": "ok", "service": "ks-rag", "version": "1.0.0" }`} />
            </div>
          </Section>

          {/* Authentication */}
          <Section id="authentication" icon={Shield} title="Authentication" subtitle="JWT Bearer tokens — all protected routes require Authorization: Bearer <token>">
            <div className="space-y-3 mb-6">
              {authEndpoints.map((ep, i) => <EndpointRow key={i} {...ep} />)}
            </div>

            <CodeBlock id="auth-flow" lang="bash" code={`# Register and get a token
curl -X POST http://localhost:8000/api/v1/users/register \\
  -H "Content-Type: application/json" \\
  -d '{"email":"you@co.com","username":"you","password":"Testpass123"}'
# -> { "access_token": "eyJ...", "token_type": "bearer" }

# Use on every protected request
curl -H "Authorization: Bearer eyJ..." \\
  http://localhost:8000/api/v1/users/me`} />

            <div className="mt-6 p-5 rounded-xl bg-white/[0.02] border border-glass-border">
              <p className="text-sm font-semibold mb-1">Connections</p>
              <p className="text-xs text-text-secondary mb-4">Before triggering any investigation, create a connection that stores your OpenMetadata credentials and optional GitHub repo. The connection_id is required on all webhook and investigation calls.</p>
              <div className="space-y-2">
                {connectionEndpoints.map((ep, i) => <EndpointRow key={i} {...ep} />)}
              </div>
            </div>
          </Section>

          {/* Webhooks */}
          <Section id="webhooks" icon={Server} title="Webhooks" subtitle="Three ways to trigger an investigation — all feed the same pipeline">
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-text-muted mb-4">
                <span className="px-2 py-1 bg-white/[0.03] border border-glass-border rounded">dbt webhook</span>
                <ArrowRight className="w-3 h-3" />
                <span className="px-2 py-1 bg-white/[0.03] border border-glass-border rounded">GitHub PR</span>
                <ArrowRight className="w-3 h-3" />
                <span className="px-2 py-1 bg-white/[0.03] border border-glass-border rounded">manual query</span>
                <ArrowRight className="w-3 h-3" />
                <span className="px-2 py-1 bg-accent/10 border border-accent/20 rounded text-accent">investigation pipeline</span>
              </div>
              <p className="text-sm text-text-secondary">The event router normalizes each format so your core logic runs once. All three return immediately — investigation runs asynchronously.</p>
            </div>
            <div className="space-y-3">
              {webhookEndpoints.map((ep, i) => <EndpointRow key={i} {...ep} />)}
            </div>
          </Section>

          {/* Investigations */}
          <Section id="investigations" icon={Code} title="Investigations" subtitle="Create, poll, and retrieve AI-powered root cause analyses">
            <div className="space-y-3 mb-6">
              {investigationEndpoints.map((ep, i) => <EndpointRow key={i} {...ep} />)}
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-glass-border mb-4">
              <p className="text-xs font-semibold text-text-primary mb-3">Status lifecycle</p>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                {['PENDING', 'LINEAGE_TRAVERSAL', 'CONTEXT_BUILDING', 'AI_ANALYSIS', 'COMPLETED'].map((s, i, arr) => (
                  <span key={s} className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded border ${s === 'COMPLETED' ? 'text-green-400 border-green-400/30 bg-green-400/5' : 'text-text-muted border-glass-border bg-white/[0.02]'}`}>{s}</span>
                    {i < arr.length - 1 && <ArrowRight className="w-3 h-3 text-text-muted" />}
                  </span>
                ))}
              </div>
              <p className="text-xs text-text-muted mt-3">Returns FAILED if OpenMetadata is unreachable. Expected in local dev without a running OpenMetadata instance.</p>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-glass-border">
              <p className="text-xs font-semibold text-text-primary mb-3">RootCause response shape</p>
              <CodeBlock id="rootcause" lang="json" code={`{
  "one_line_summary": "Column user_id in raw.users was renamed to customer_id",
  "detailed_explanation": "...",
  "break_point_fqn": "raw.users",
  "break_point_change": "Column renamed: user_id -> customer_id",
  "affected_assets": [
    { "fqn": "stg_users", "severity": "critical", "reason": "references old column" }
  ],
  "suggested_fixes": [
    { "description": "Update stg_users.sql line 14", "code_snippet": "SELECT customer_id ..." }
  ],
  "owner_to_contact": "data-team@company.com",
  "confidence": 0.92
}`} />
            </div>
          </Section>

          {/* Chat */}
          <Section id="chat" icon={MessageSquare} title="Chat" subtitle="Multi-turn investigation sessions with automatic follow-up detection">
            <div className="space-y-3 mb-5">
              {chatEndpoints.map((ep, i) => <EndpointRow key={i} {...ep} />)}
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-glass-border text-xs text-text-secondary">
              Follow-up detection is keyword-based. Messages containing "what", "why", "how", "fix", "impact" etc. are answered from cached investigation data without re-running lineage traversal — typically instant.
            </div>
          </Section>

          {/* GitHub Bot */}
          <Section id="github-bot" icon={GitBranch} title="GitHub Bot" subtitle="AI-generated impact analysis posted on PRs before merge">
            <div className="space-y-5">
              <p className="text-sm text-text-secondary">
                When a PR modifies <code className="text-accent text-xs">.sql</code> or <code className="text-accent text-xs">.yml</code> files, Pipeline Autopsy posts an immediate placeholder comment, runs the full investigation in the background, then edits the comment with root cause, affected assets, and suggested fixes.
              </p>

              <div className="space-y-2">
                {[
                  'PR opened on GitHub',
                  'Webhook fires to /api/v1/github/webhook (HMAC-validated)',
                  'Diff parsed — .sql and .yml files extracted',
                  '"Analysis started" comment posted to PR immediately',
                  'Background: lineage traversal + AI analysis (~1350ms)',
                  'PR comment edited with root cause, affected assets, suggested fixes',
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs text-text-secondary">
                    <span className="w-5 h-5 rounded-full bg-white/[0.04] border border-glass-border text-text-muted font-mono text-xs flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    {step}
                  </div>
                ))}
              </div>

              <CodeBlock id="github-setup" lang="bash" code={`# 1. Expose local server via ngrok
ngrok http 8000
# -> https://XXXX.ngrok-free.app

# 2. Add webhook in GitHub repo Settings -> Webhooks:
#    URL:    https://XXXX.ngrok-free.app/api/v1/github/webhook?connection_id=X&user_id=Y
#    Events: Pull requests
#    Secret: <value of GITHUB_WEBHOOK_SECRET in .env>

# 3. Add your PAT (repo + workflow scopes) to .env:
#    GITHUB_TEST_PAT=ghp_...`} />

              <div className="rounded-xl overflow-hidden border border-glass-border bg-[#0d1117]">
                <div className="flex items-center gap-2 px-5 py-3 bg-white/[0.02] border-b border-white/[0.06]">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                  <span className="ml-3 text-xs text-[#8b949e] font-mono">example PR comment</span>
                </div>
                <div className="p-6 font-mono text-xs leading-loose text-[#c9d1d9]">
                  <p className="text-[#58a6ff] font-bold text-sm mb-3">Pipeline Autopsy — Analysis Complete</p>
                  <p className="text-[#8b949e] mb-4">Schema change in <span className="text-[#79c0ff]">migrations/orders.sql</span></p>
                  <p className="text-[#e6edf3] font-semibold mb-1">Root Cause</p>
                  <p className="text-[#8b949e] mb-4 pl-3 border-l border-white/10">Column rename in upstream source propagated downstream, causing NULL values in dependent models.</p>
                  <p className="text-[#e6edf3] font-semibold mb-2">Affected Assets</p>
                  <p className="mb-1 pl-3">[CRITICAL] stg_orders — will break on next run</p>
                  <p className="mb-4 pl-3">[HIGH]     revenue_dashboard — will show NULLs</p>
                  <p className="text-[#e6edf3] font-semibold mb-1">Suggested Fix</p>
                  <p className="text-[#8b949e] pl-3 border-l border-white/10 mb-4">Update column references in stg_orders.sql before merging.</p>
                  <p className="text-[#8b949e]">Confidence: <span className="text-green-400">85%</span>  —  Owner: <span className="text-[#79c0ff]">data-team@company.com</span></p>
                </div>
              </div>
            </div>
          </Section>

          {/* Configuration */}
          <Section id="configuration" icon={Shield} title="Configuration" subtitle="All settings via server/.env">
            <CodeBlock id="env" lang="env" code={`# DATABASE
# Must be rag_database — controllers hardcode this name
MONGO_URI=mongodb://localhost:27017/rag_database

# AUTH
SECRET_KEY=your-super-secret-key-change-in-production
ACCESS_TOKEN_EXPIRE_MINUTES=30

# OPENMETADATA
OPENMETADATA_URL=http://localhost:8585
OPENMETADATA_API_KEY=eyJ...

# LLM — Claude preferred, falls back to OpenAI, then Groq
CLAUDE_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
GROQ_API_KEY=gsk_...
DEFAULT_LLM_PROVIDER=claude
AI_MODEL=claude-sonnet-4-20250514

# GITHUB
GITHUB_WEBHOOK_SECRET=your-webhook-secret
GITHUB_TEST_PAT=ghp_...      # repo + workflow scopes

# SERVER
CORS_ORIGINS=["http://localhost:3000","http://localhost:5173"]
APP_HOST=0.0.0.0
APP_PORT=8000`} />

            <div className="mt-5 grid sm:grid-cols-3 gap-3 text-xs">
              {[
                { label: 'Never commit .env', sub: 'Added to .gitignore by default' },
                { label: 'Rotate keys every 90 days', sub: 'Use AWS Secrets Manager in prod' },
                { label: 'Validate before starting', sub: 'python check_env.py --full' },
              ].map((tip) => (
                <div key={tip.label} className="p-3 rounded-xl bg-white/[0.02] border border-glass-border">
                  <p className="font-semibold text-text-primary">{tip.label}</p>
                  <p className="text-text-muted mt-0.5">{tip.sub}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* CTA */}
          <div className="px-8 sm:px-16 py-16 text-center">
            <h3 className="text-2xl font-bold mb-3">Ready to connect?</h3>
            <p className="text-text-secondary text-sm mb-7 max-w-md mx-auto">
              Point your dbt Cloud or GitHub webhook at a running instance and investigations start automatically.
            </p>
            <button className="btn-primary">
              Request Early Access <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </motion.div>
      </main>
    </div>
  );
}