# CoderTech — Isaac, Software & App Developer (Kenya)

Portfolio, blog, template shop and AI project assistant.
Built with TanStack Start, React, TypeScript and Tailwind CSS v4.

## Setup

```sh
npm install      # or: bun install
npm run dev      # http://localhost:3000
npm run build    # production build
npx vitest run   # tests
```

Termux: `pkg install nodejs` first. Edit in VS Code, Acode or any text editor.

## Structure

```
src/routes/          pages (index, blog, shop, templates/$slug, sitemap.xml)
src/components/      portfolio + template-shop UI
src/content/         editable content: articles.ts, projects.ts, templates.ts
src/assets/          images
src/styles.css       design tokens and styles
public/templates/    standalone HTML/CSS/JS templates (no build needed)
public/downloads/    ZIPs of those templates
```

## Configuration & Integrations

- AI project assistant supports `GEMINI_API_KEY` or `OPENAI_API_KEY` (server env).
- Contact form saves submissions to database and forwards inquiries to inbox via FormSubmit.
- Template prices and payment checkout can be configured when payment delivery is established.
