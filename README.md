# Shravya Nahar — Portfolio Site

A static site — plain HTML/CSS/JS, no build step, no framework. Open `index.html` in a browser and it just works.

## What's here
```
index.html         the whole site, one page
css/style.css       all styling
js/script.js        film strip drag-scroll + lightbox + sprocket rendering
images/             hero background + all 10 film strip photos (real files, not embedded)
assets/             your resume PDF
```

## Before you publish — 3 things still need real content
1. **LinkedIn button** (`index.html`, near the bottom, in the Contact section) — currently links to `#`. Replace `href="#"` with your actual LinkedIn URL.
2. **Project links** — each row in the Projects section links to `#`. Point each one at the actual project (a write-up, a PDF, a live link — whatever you have) once you have somewhere to send people.
3. **Project blurbs** — the one-line descriptions under each project title are my placeholder guesses based on the titles. Swap in your real descriptions.

## How to host it (pick one, all free)

### GitHub Pages
1. Create a new GitHub repo, upload this whole folder (keep the folder structure intact).
2. Repo Settings → Pages → set source to the `main` branch, root folder.
3. Your site goes live at `https://yourusername.github.io/repo-name/`.

### Netlify (easiest — drag and drop)
1. Go to netlify.com, sign up free.
2. Drag this entire folder onto the "Deploy" area on their dashboard.
3. Done — you get a live URL immediately, and can add a custom domain later if you want.

### Vercel
Similar to Netlify — sign up, drag the folder in (or connect a GitHub repo), it deploys automatically.

## If you want a custom domain later
All three options above support connecting a custom domain (e.g. `shravyanahar.com`) for free once you own the domain name — you'd buy the domain separately (Namecheap, Google Domains, etc.) and point it at whichever host you pick.
