# The Technology Bureau — website

Marketing site for Jason van Lint's fractional CTO practice, *The Technology Bureau*.
Static HTML/CSS/JS — no build step, no dependencies.

## Structure

```
index.html      All page content (hero, ten areas, engagements, about, health-check CTA)
styles.css      Design system + layout (palette + type tokens at the top of the file)
script.js       Progressive enhancement: mobile nav, scroll reveal, header state, mailto form
assets/
  logo-mark.svg   Monogram (header + favicon source)
  logo-full.svg   Full lockup with wordmark + tagline (footer)
  favicon.svg     Monogram on navy tile for browser tabs
```

## Brand

- **Typeface:** Montserrat (Medium 500 base), loaded from Google Fonts.
- **Palette** (from the logo mark):
  | Token | Hex | Use |
  |-------|-----|-----|
  | `--navy` | `#12303D` | Headings, header, dark sections |
  | `--gold` | `#BEA572` | Accent, wordmark, CTA highlight |
  | `--teal` | `#2F7E74` | Links, form focus, tick marks |
  | `--paper` | `#FAF8F4` | Page background |

## Running locally

Open `index.html` directly, or serve the folder:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Contact form

The health-check form has no backend. On submit it validates, then opens the
visitor's mail client with a pre-filled message to `healthcheck@thetechnologybureau.com.au`.
To use a hosted form service later, replace the `submit` handler in `script.js`.

General enquiries go to `hello@thetechnologybureau.com.au` (footer link).

## Deploying

Any static host works (Netlify, Cloudflare Pages, GitHub Pages, S3). Upload the
folder as-is; there is nothing to compile.
