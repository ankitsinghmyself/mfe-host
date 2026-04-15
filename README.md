# MFE Host Shell App 🚀

[![React](https://img.shields.io/badge/React-19.2.5-brightgreen)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue)](https://www.typescriptlang.org)
[![Webpack Module Federation](https://img.shields.io/badge/Module_Federation-Enabled-orange)](https://webpack.js.org/concepts/module-federation/)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)](https://mfe-host-rosy.vercel.app)

## Overview
This is the **Host Shell** application for the Micro Frontend (MFE) Demo. It uses [Webpack 5 Module Federation](https://webpack.js.org/concepts/module-federation/) to dynamically load remote MFEs:

- **Dashboard** (`/dashboard`): Loaded from `dashboard@https://mfe-remote-dashboard.vercel.app/remoteEntry.js`
- **Profile** (`/profile`): Loaded from `profile@https://mfe-remote-profile.vercel.app/remoteEntry.js`

**Live Demo**: [mfe-host-rosy.vercel.app](https://mfe-host-rosy.vercel.app)

### Features
- React Router for navigation (`/dashboard` | `/profile`)
- Lazy-loading remotes with Suspense fallback
- Shared singleton dependencies (React, React-DOM, React Router)
- Responsive layout with Header & Sidebar

## Module Federation Config
See `craco.config.js`:

```js
new ModuleFederationPlugin({
  name: \"host\",
  remotes: {
    dashboard: \"dashboard@https://mfe-remote-dashboard.vercel.app/remoteEntry.js\",
    profile: \"profile@https://mfe-remote-profile.vercel.app/remoteEntry.js\",
  },
  shared: {
    react: { singleton: true },
    \"react-dom\": { singleton: true },
    \"react-router-dom\": { singleton: true },
  },
});
```

## Quick Start

### Prerequisites
- Node.js 18+
- Yarn/NPM

### Local Development
1. **Start Remotes** (different ports):
   ```bash
   # Terminal 1: Dashboard (port 3001)
   cd remote-dashboard
   npm install
   npm start  # Uses PORT=3001 (update package.json if needed)
   
   # Terminal 2: Profile (port 3002)
   cd remote-profile
   npm install
   npm start  # PORT=3002
   ```

2. **Start Host** (port 3000):
   ```bash
   cd host
   npm install
   npm start
   ```
   
   **Note**: Update `craco.config.js` remotes to local URLs for dev:
   ```
   dashboard: \"dashboard@http://localhost:3001/remoteEntry.js\",
   profile: \"profile@http://localhost:3002/remoteEntry.js\",
   ```

3. Open [http://localhost:3000](http://localhost:3000)

### Build & Production
```bash
cd host && npm run build  # Outputs to build/
```

## Project Structure
```
host/
├── craco.config.js       # Module Federation
├── src/
│   ├── App.tsx           # Router + lazy remotes
│   ├── bootstrap.tsx     # Entry
│   └── components/       # Header, Sidebar, Layout
├── public/
└── package.json
```

## Deployment
- Push to GitHub → Vercel auto-deploys.
- Remotes must be deployed first (update host remotes URLs).

## Troubleshooting
- **Remote load fails**: Check remoteEntry.js URLs, CORS, singleton conflicts.
- **Shared deps mismatch**: Ensure all apps use same React version.

## Contributing
See root [README.md](../README.md) for monorepo guidelines.

### License
MIT
