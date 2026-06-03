# James Mowat — Portfolio

A single-page developer/cyclist portfolio. Pure static files — **no build step**.

## Files
- `index.html` — the site (edit copy, projects, links directly in here)
- `assets/james.jpg` — hero / about photo
- `tweaks-panel.jsx`, `tweaks-app.jsx` — the optional design-tweak panel (loaded in-browser)
- `strava-proxy.worker.js` — the Cloudflare **Worker** that feeds live Strava data (deploy separately, not part of the site)

## Deploy to Cloudflare Pages

### Option A — Direct upload (fastest)
1. Cloudflare dash → **Workers & Pages** → **Create** → **Pages** → **Upload assets**.
2. Drag in the **contents of this folder** (so `index.html` sits at the root — do not nest it inside another folder).
3. Deploy. Done.

### Option B — Git
1. Push this folder to a GitHub repo.
2. Cloudflare → Pages → **Connect to Git** → pick the repo.
3. Build command: **(leave empty)** · Build output directory: **/** (or the folder this lives in).
4. Save & Deploy.

### Option C — Wrangler CLI
```bash
npm install -g wrangler
wrangler pages deploy .
```

## Editing
- **Text / projects / links:** edit `index.html` directly.
- **Photo:** replace `assets/james.jpg` (keep the filename, or update the `src` in `index.html`).
- **Live Strava data:** the URL lives in `index.html` near the bottom:
  ```js
  const STRAVA_ENDPOINT = 'https://empty-breeze-b60c.james1mowat.workers.dev/';
  ```
  Leave it as-is to keep pulling real season totals; set to `''` to use the animated demo only.

## Notes
- React, Babel and Google Fonts load from CDNs, so the site needs an internet connection (normal for a deployed page).
- The Strava worker is deployed independently as a **Worker**, not part of this Pages project.
