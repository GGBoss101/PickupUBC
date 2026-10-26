# PickupUBC
This website has been built by Dhairya Chopra as of May 6th, 2026, for the club PickupUBC of the AMS at The University of British Columbia, Vancouver, British Columbia, Canada.

## Development
This is a [Vite](https://vite.dev) + React app.

```bash
npm install     # install dependencies (first time only)
npm run dev     # start the dev server at http://localhost:5173
npm run build   # build for production into dist/
npm run preview # locally preview the production build (at /PickupUBC/)
```

## Theme
The site uses a retro / pixel-art theme. Sprites live in `src/assets/sprites/` (trimmed WebP copies of the
artwork in `public/no_bg_design_images/`) and are registered in `src/assets/sprites.js`. Colors and fonts are
CSS variables at the top of `src/style.css`. Page content lives in `src/data/` (stats, gallery entries, links
and meeting schedule).
