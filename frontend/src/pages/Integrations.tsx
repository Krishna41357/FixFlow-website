import { motion } from 'framer-motion';
import { Database, Terminal, Server, Cloud, Shield, GitCommit, ArrowRight } from 'lucide-react';
import GithubIcon from '../components/GithubIcon';

export default function Integrations() {
  const integrations = [
    {
      name: 'OpenMetadata',
      status: 'Live',
      statusColor: 'text-green-400 bg-green-400/10 border-green-400/20',
      icon: <Database className="w-8 h-8 text-[#FF694B]" />,
      desc: 'Native integration for dynamic lineage traversal and schema state fetching.',
      glow: 'group-hover:shadow-glow',
    },
    {
      name: 'GitHub',
      status: 'Live',
      statusColor: 'text-green-400 bg-green-400/10 border-green-400/20',
      icon: <GithubIcon className="w-8 h-8 text-text-primary" />,
      desc: 'PR Bot integration to catch schema breaks before they merge.',
      glow: 'group-hover:shadow-glow',
    },
    {
      name: 'dbt Core',
      status: 'Live',
      statusColor: 'text-green-400 bg-green-400/10 border-green-400/20',
      icon: <Terminal className="w-8 h-8 text-[#FF6B6B]" />,
      desc: 'Parses dbt artifacts (run_results.json, manifest.json) to trigger investigations.',
      glow: 'group-hover:shadow-glow',
    },
    {
      name: 'Snowflake',
      status: 'Live',
      statusColor: 'text-green-400 bg-green-400/10 border-green-400/20',
      icon: <Cloud className="w-8 h-8 text-[#29B5E8]" />,
      desc: 'Supported through OpenMetadata for column-level lineage.',
      glow: 'group-hover:shadow-glow',
    },
    {
      name: 'BigQuery',
      status: 'Coming Soon',
      statusColor: 'text-text-muted bg-white/[0.03] border-glass-border',
      icon: <Server className="w-8 h-8 text-[#4285F4]" />,
      desc: 'Direct query log parsing for enhanced lineage beyond OpenMetadata.',
      glow: '',
    },
    {
      name: 'GitLab',
      status: 'Coming Soon',
      statusColor: 'text-text-muted bg-white/[0.03] border-glass-border',
      icon: <GitCommit className="w-8 h-8 text-[#FC6D26]" />,
      desc: 'MR Bot integration for teams using GitLab.',
      glow: '',
    },
  ];

  return (
    <div className="relative pt-28 sm:pt-32 pb-20 sm:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-radial-subtle" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 divider-glow" />

      <div className="container-lg relative z-10">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="badge mb-8"
          >
            <Shield className="w-4 h-4" />
            Ecosystem
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 text-gradient-white"
          >
            Integrations
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto"
          >
            FixFlow slots perfectly into your modern data stack, connecting your execution tools, catalogs, and version control.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
        >
          {integrations.map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className={`glass group p-6 relative overflow-hidden cursor-default hover:shadow-glass-hover transition-all duration-300 ${item.glow} ${
                item.status === 'Coming Soon' ? 'opacity-60' : ''
              }`}
            >
              {/* Status Badge */}
              <div className={`absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${item.statusColor}`}>
                {item.status}
              </div>

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-glass-border flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-white/[0.05] transition-all duration-500">
                {item.icon}
              </div>

              <h3 className="text-lg font-bold mb-2 text-text-primary">{item.name}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 sm:mt-20 glass-strong p-8 sm:p-12 text-center relative overflow-hidden hover:shadow-glass-hover transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.03] to-transparent" />
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gradient-white">Don't see your tool?</h2>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              Our architecture is highly extensible. We're constantly adding new intake events and metadata providers.
            </p>
            <a href="mailto:support@fixflow.ai" className="btn-primary">
              Request an Integration <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
        

        );
}
