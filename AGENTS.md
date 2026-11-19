## Application rules

- Keep sale-template inventory in src/content/templates.ts and render previews/shop with shared catalogue controls; standalone public/templates folders and matching ZIPs must contain no application dependencies. Missing prices stay null and checkout stays unavailable until real pricing/payment delivery exist.
- Keep template cart state in a root-scoped React provider so route navigation retains selections during the current visit without claiming a saved order or payment.
- Keep the portfolio as one scrolling index route with section anchors because the requested experience explicitly uses smooth in-page navigation.
- Keep reusable presentation and carousel behavior in src/components/portfolio; the index route owns page composition and page-specific metadata.
- Define portfolio styling through semantic tokens and named styles in src/styles.css; controls use the shared Button variants.
- Contact inquiries go through a server function that stores each one in contact_submissions, then forwards it to the owner's inbox via FormSubmit; success means stored, independent of forwarding.
- Carousel announcements distinguish item totals from scroll positions because multiple visible items can share a snap position.
- Missing personal/project media uses labeled placeholders; keep original assets unused for reversibility rather than presenting generated imagery as real work.
- Keep bundled journal content in src/content/articles.ts and render it at /blog and /blog/$slug; shared article cards provide typed links so previews and related articles use the same destinations.
- Keep article sharing in a browser-capability-aware presentation component using canonical published URLs, with manual copying when clipboard access fails; this supports SSR and devices without native sharing.
- Measure reading progress against the article body, not the full page, using a labeled native progress element without live scroll announcements; reuse each article’s existing reading-time estimate.
- Store the visitor reading list locally with a versioned key and hydration-safe synchronized hook because saved articles explicitly stay on the same device, without accounts or a backend.
- Derive contents links and unique heading IDs from the same helper for articles with at least three sections; native anchors and focusable headings support keyboard navigation and direct section URLs.
