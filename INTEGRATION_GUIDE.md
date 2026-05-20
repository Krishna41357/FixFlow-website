# 🚀 FixFlow Integration Guide

Welcome to **FixFlow** — AI-powered root cause analysis for your data pipeline failures.

FixFlow automatically detects when your data assets break, walks through your data lineage to find the exact breaking point, explains it in plain English, and surfaces fixes — all through an intelligent GitHub PR bot that catches issues **before they're merged**.

---

## 📋 Prerequisites

Before integrating FixFlow, ensure you have:

- **GitHub Account** with access to your repositories
- **OpenMetadata Instance** (self-hosted or cloud) with your data catalog
- **GitHub Repository Admin Access** (to configure webhooks and bot permissions)

---

## 🔧 Integration Steps

### Step 1: Prepare Your OpenMetadata Instance

FixFlow needs to access your data lineage through OpenMetadata. You'll need:

1. **OpenMetadata URL**
   - Example: `https://your-openmetadata.company.com` or `http://localhost:8585` (for local deployments)

2. **Create an OpenMetadata API Key**
   - Log in to your OpenMetadata instance
   - Navigate to **Settings → Integrations → Bots**
   - Create a new bot user or use the existing `ingestion-bot`
   - Copy the **JWT Token** — this is your API key
   - Store this securely (you'll provide it during setup)

---

### Step 2: Connect Your GitHub Repository

FixFlow's bot needs permission to read and comment on pull requests.

1. **Grant Bot Permissions**
   - Go to your GitHub repository → **Settings → Collaborators & teams**
   - Add the FixFlow bot user with at least **Pull Request Reviewer** role
   - The bot needs these permissions:
     - Read pull requests
     - Post comments on PRs
     - Access to PR metadata

2. **Enable Webhook Integration**
   - In your repository settings → **Webhooks**, FixFlow can automatically register webhooks
   - Alternatively, configure manually if your instance has network restrictions

---

### Step 3: Authenticate with FixFlow

1. **Sign Up / Log In**
   - Visit the FixFlow platform
   - Create an account or log in with your credentials

2. **Set Up Your First Connection**
   - Click **"Add Connection"** in the dashboard
   - Provide:
     - **Connection Name**: e.g., "Production Data Catalog"
     - **OpenMetadata URL**: Your OpenMetadata instance URL
     - **OpenMetadata API Key**: The JWT token from Step 1
     - **GitHub Repository** (optional): `owner/repo` format (e.g., `mycompany/data-pipelines`)

3. **Test the Connection**
   - Click **"Verify Connection"**
   - FixFlow will validate access to your OpenMetadata instance and GitHub repo

---

## 🤖 How the GitHub PR Bot Works

Once integrated, FixFlow automatically monitors your GitHub pull requests.

### When a PR Contains Schema Changes:

1. **Detection**
   - The bot detects schema changes (column renames, type changes, drops, etc.)

2. **Analysis**
   - FixFlow walks your data lineage to understand downstream impacts
   - It identifies which datasets, dashboards, or pipelines will be affected

3. **Comment on PR**
   - The bot posts an intelligent analysis comment with:
     - **Impact Summary**: What downstream assets are affected
     - **Risk Level**: High/Medium/Low based on impact scope
     - **Recommendations**: Suggested fixes or workarounds

### Example PR Comment:

```
🚨 FixFlow Impact Analysis

Schema Change Detected: Column 'user_id' renamed to 'customer_id' in table 'dim_users'

📊 Downstream Impact:
- 3 dependent tables affected
- 2 active dashboards at risk
- 5 scheduled jobs may fail

⚠️ Risk Level: HIGH

💡 Recommendation:
Update the column reference in 'fact_orders' table before merging, 
or add a deprecation warning to consuming pipelines.

Learn more: [FixFlow Dashboard](#)
```

---

## 🔐 Security & Authentication

### API Key Safety

- Your OpenMetadata API key is encrypted and stored securely
- Never share your API key with unauthorized users
- If you suspect key compromise, regenerate it in OpenMetadata immediately

### GitHub Bot Permissions

The FixFlow bot only requires:
- ✅ Read access to PR content and repository metadata
- ✅ Ability to post comments on PRs
- ❌ Never requires write access to your code
- ❌ Never requires access to your secrets or credentials

### OAuth/JWT Authentication

- FixFlow uses standard OAuth 2.0 for GitHub authentication
- JWT tokens are used for OpenMetadata API communication
- Session tokens expire after 1 hour (automatic refresh available)

---

## 📊 Platform Features

### Dashboard

View all your connections, recent investigations, and integration status in one place.

### Connection Manager

Manage multiple OpenMetadata instances and GitHub repositories from a single FixFlow account.

### Investigation History

See past impact analyses and root cause investigations for your data assets.

### Real-Time Alerts

Receive notifications when:
- A new schema change is detected
- A data asset failure is identified
- Downstream impacts are analyzed

---

## ⚙️ Configuration Options

### Per-Connection Settings

After creating a connection, customize:

- **Auto-Comment on PRs**: Enable/disable automatic bot comments
- **Risk Threshold**: Only alert on High/Critical risk changes (ignore Medium/Low)
- **Notification Preferences**: Email, Slack, or dashboard-only alerts
- **Analysis Scope**: Include/exclude specific datasets or schemas

### Team Collaboration

- Invite team members to your FixFlow workspace
- Share connection access across your data engineering team
- Set role-based permissions (Admin, Editor, Viewer)

---

## 🆘 Troubleshooting

### Connection Won't Verify

**Problem**: "Failed to connect to OpenMetadata"

**Solutions**:
- Verify the OpenMetadata URL is correct and accessible
- Check that the API key hasn't expired (regenerate in OpenMetadata Settings)
- Ensure your network/firewall allows outbound HTTPS connections to OpenMetadata

### Bot Not Commenting on PRs

**Problem**: GitHub PR bot isn't posting analysis comments

**Solutions**:
- Verify the bot user has been added to your GitHub repository as a collaborator
- Check that webhooks are properly configured (Settings → Webhooks)
- Ensure the repository is linked in your FixFlow connection settings

### Missing Lineage Data

**Problem**: FixFlow says "No lineage data found for this asset"

**Solutions**:
- Verify the asset is registered in OpenMetadata
- Ensure OpenMetadata has successfully cataloged the asset's lineage
- Check that the asset name matches exactly (case-sensitive)

### Slow Analysis

**Problem**: FixFlow takes too long to analyze changes

**Solutions**:
- Large lineage graphs may take longer to traverse
- This is normal for complex data catalogs with 100+ interconnected tables
- Analysis typically completes within 2-5 minutes

---

## 📚 What's Next?

1. **Create Your First Connection** → Start with one OpenMetadata instance
2. **Enable PR Bot** → Add FixFlow bot to a test repository first
3. **Review Initial Analyses** → Check dashboard for insights
4. **Expand to Team** → Invite team members to collaborate
5. **Optimize Settings** → Fine-tune risk thresholds and alerts based on your needs

---

## 💬 Support & Feedback

Have questions or feature requests?

- **Documentation**: Check the platform help section
- **Email Support**: support@fixflow.dev
- **Community**: Join our Slack community for discussions
- **GitHub Issues**: Report bugs on our GitHub repository

---

## 📄 Privacy & Compliance

FixFlow respects your data privacy:

- ✅ Your data lineage is queried in real-time from OpenMetadata (not stored)
- ✅ PR analysis comments are posted by the bot; we don't store comment history
- ✅ API keys are encrypted and never logged
- ✅ Compliant with SOC 2, GDPR, and enterprise security standards

---

**Ready to integrate?** [Get Started Now](#) or [Schedule a Demo](#)

---

*FixFlow — Catch data issues before production breaks.*
