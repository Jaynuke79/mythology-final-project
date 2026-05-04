# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a mythology class final project: an interactive website built around a visual map of Yggdrasil (the Norse World Tree). Users navigate the nine realms by scrolling, clicking, and typing — each realm reveals stories, characters, and visuals drawn from Norse mythology, with a focus on Jotunheim, Niflheim, and Muspelheim.

The homepage is a long vertical-scrolling page showing the trunk of Yggdrasil from the Eagle at the top to Níðhöggr (the wyrm) at the bottom. Sections of the page correspond to realms. Clicking branches or regions opens stories or embedded media (video game clips, film stills, etc.).

## Project Requirements

- **Length**: Digital project — at least 10 slides/sections, each with images and a minimum 100 words of text.
- **Artist's Statement**: 1–2 pages covering inspiration, what you wanted to convey, and explanations of creative choices (10% of grade).
- **Submission**: The assignment accepts all file types; submit as a link if files are too large to upload.

## Architecture

Vanilla HTML/CSS/JS, no build step. Deployed to GitHub Pages via `.github/workflows/pages.yml` (triggers on push to `main`).

**Dev**: open `index.html` directly in a browser, or run a local server:
```
python3 -m http.server 8000
```

**Files**:
- `index.html` — all nine realm `<section>` elements in scroll order, plus modal overlay
- `style.css` — layout, realm-specific color themes, scroll-reveal animation classes
- `script.js` — IntersectionObserver for scroll reveal + active nav, modal open/close

**Key patterns**:
- Realm content fades in via `.realm__content` → `.visible` (driven by `IntersectionObserver` in `script.js`)
- Nav link highlights as you scroll using a second `IntersectionObserver` on each `.realm` section
- Modal is triggered by calling `window.openModal(html)` from anywhere; close on Escape, backdrop click, or ×
- Each realm `<section>` has `realm--light` or `realm--deep` class; deep realms (Jotunheim, Niflheim, Muspelheim) get distinct background gradients and heading colors defined in `style.css`

## Nine Realms Reference

| Realm | Location on Tree | Focus |
|---|---|---|
| Asgard | Top (with the Eagle) | Light |
| Vanaheim | Upper branches | Light |
| Alfheim | Upper branches | Light |
| Midgard | Mid-trunk | Light |
| Jotunheim | Roots/branches | **Deep** |
| Niflheim | Lower roots | **Deep** |
| Muspelheim | Lower roots | **Deep** |
| Svartalfheim | Roots | Light |
| Helheim | Deepest roots (with Níðhöggr) | Light |
