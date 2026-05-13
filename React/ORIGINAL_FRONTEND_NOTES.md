# Original Frontend Notes

## Original State

Before the React prototype changes, this folder was a basic Vite frontend starter.

The original UI showed the default Vite-style content:

- "Get started"
- Vite logo
- JavaScript logo
- Counter button
- Documentation/community links

The original frontend did not yet contain a working SiteSensei dashboard, login flow, plugin sidebar, recommendation workflow, AI API layer, or database integration.

## What Was Reused

The current prototype still reuses the original project shell:

- The `frontend` folder location
- The Vite development/build setup
- The existing `dev`, `build`, and `preview` scripts
- `index.html` as the HTML entry shell
- `src/assets/hero.png` as a visual asset in the fake website preview
- Existing `public/favicon.svg`

## What Was Changed

The original starter UI was replaced with a SiteSensei React prototype.

Changed files:

- `index.html`
  - Updated the page title.
  - Changed the script entry from `/src/main.js` to `/src/main.jsx`.
- `src/style.css`
  - Rewritten for the SiteSensei dashboard, fake website preview, sidebar, login page, and modal.
- `package.json`
  - Added React-related dependencies.
- `package-lock.json`
  - Updated automatically by `npm install`.

Deleted original starter files:

- `src/main.js`
- `src/counter.js`
- `src/assets/vite.svg`
- `src/assets/javascript.svg`
- `public/icons.svg`

Removed generated files:

- `dist/`
  - This is a Vite build output folder and can be regenerated with `npm run build`.

Added files:

- `src/main.jsx`
  - React entry point.
- `src/App.jsx`
  - Main React application and UI components.
- `src/mockApi.js`
  - Simulated API layer.
- `src/mockAi.js`
  - Simulated AI recommendation/explanation layer.
- `src/mockDatabase.js`
  - Simulated database using browser `localStorage`.
- `vite.config.js`
  - Enables the Vite React plugin.

## Current Prototype Architecture

The current prototype uses this flow:

```text
React UI
-> mockApi.js
-> mockAi.js / mockDatabase.js
-> preset AI responses / browser localStorage
```

This means the app behaves like it has an API, AI service, and database, but these are currently simulated for demonstration.

## Important Clarification

The current login is not a real backend login and was not created by the original teammate.

Demo credentials:

```text
Email: admin@sitesensei.test
Password: sitesensei
```

These credentials are stored in `src/mockDatabase.js` and used only for the prototype.

## Future WordPress/Gutenberg Migration

The next migration steps should be:

1. Split `src/App.jsx` into smaller React components.
2. Create a WordPress plugin shell with `sitesensei.php`.
3. Move the recommendation sidebar into a Gutenberg `PluginSidebar`.
4. Replace `mockApi.js` with a real WordPress REST API client.
5. Replace `mockDatabase.js` with WordPress database storage:
   - `wp_options` for plugin settings.
   - `wp_postmeta` for page/post recommendations.
   - A custom table later for recommendation history if needed.
6. Replace `mockAi.js` with a real AI endpoint or server-side rule/AI engine.

## Build Status

The React version has been verified with:

```bash
npm run build
```

The build completed successfully.
