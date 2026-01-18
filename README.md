# WRIS Website

**Workgroup for Resilient Industrial Systems**

This repository contains the source code for the official WRIS website. The site serves as a public-facing platform for showcasing research activity, internal developments, publications, events, and membership information.

The project is intentionally lightweight, static, and framework-free, prioritizing clarity, performance, and long-term maintainability.

---

## Purpose

The website is designed to:

- Introduce WRIS and its mission
- Communicate ongoing research, initiatives, and milestones
- Publish outputs (guides, reports, media)
- Provide transparency into organizational processes
- Collect interest and contact information from prospective members

---

## Tech Stack

- **HTML5** – semantic, accessible structure
- **CSS3** – custom styles, responsive layout, animations
- **Vanilla JavaScript** – dynamic rendering and interactions
- **JSON** – structured content for updates and roadmap items
- **Typeform Embed** – email and interest collection

No frontend framework or build system is used.

---

## Project Structure

```
/
├── index.html
├── events.html
├── members.html
├── publications.html
├── updates.html
│
├── css/
│   ├── styles-boilerplate.css
│   ├── styles-updates.css
│
├── js/
│   ├── updates.js
│   ├── ascii-graphics.js
│
├── assets/
│   ├── logo.png
│   ├── updates.json
│   └── *.json
│
└── README.md
```

---

## Content System (JSON-driven)

Dynamic sections (such as **Updates**) are powered by JSON files located in `assets/`.

Example schema:

```json
{
  "title": "Website Launch",
  "description": "The early-stage website has been launched...",
  "category": "Milestone",
  "date": "2026-01-18",
  "featured": true,
  "tags": ["web", "milestone", "internal-development"]
}
```

### Fields

- **title** — short, descriptive heading
- **description** — concise explanation of the update
- **category** — e.g. Milestone, Initiative, Publication
- **date** — ISO format (`YYYY-MM-DD`)
- **featured** — controls featured section visibility
- **tags** — used for filtering and statistics

---

## Styling & Layout

- Responsive navigation with mobile toggle
- Section-based layout with semantic class naming
- Subtle animations (fade/slide) for content entry
- Hover and interaction states for stats and cards
- Minimal color palette centered around WRIS branding

---

## Accessibility & UX

- Semantic HTML structure
- Keyboard-navigable navigation
- Readable contrast ratios
- Motion kept subtle and purposeful

---

## Email Collection & Privacy

The site embeds a Typeform for collecting email addresses and interest submissions.

**Important:**
A privacy notice or policy should be note added if personal data collection expands beyond basic contact information.

---

## Local Development

No build step is required.

To run locally:

1. Clone the repository
2. Open any `.html` file in a browser
   _(or use a simple local server if preferred)_

---

## Roadmap

Planned improvements include:

- Expanded member guide and documentation
- Richer publication and media sections
- Improved filtering and tagging
- Internal-only content segregation
- Formal privacy and governance documentation

---

## License

© 2026 Michel Deosaran
All rights reserved.

---
