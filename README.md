# Webtoon Masterclass Landing

## Structure

- `index.html` - production landing page
- `assets/css/base.css` - CSS entrypoint that imports split style files
- `assets/css/enhancements.css` - animations, hover states, progressive UI effects
- `assets/css/*.css` - block-level style files for navigation, hero, program, pricing, partners, footer, and utilities
- `assets/js/main.js` - tabs, FAQ, reveal, parallax, and form interactions
- `assets/images/` - audience and final-banner images
- `photo/` - logos and mentor/partner media

## Deploy

- Static deployment: upload the full project directory to any static host or web server.
- Main entrypoint: `index.html`.
- No build step required.

## Recommended next steps

1. Move repeated inline styles into semantic utility or component classes.
2. Replace the remaining inline section styles with block classes inside the split CSS files.
3. Replace inline `onclick` and hover handlers with delegated JS bindings.
4. Extract base64 media into `assets/images/` if you want lighter HTML and easier asset reuse.
