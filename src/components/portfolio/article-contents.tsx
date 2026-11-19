import type { Article } from "@/content/articles";

export function articleSectionId(heading: string, index: number) {
  return `section-${index + 1}-${heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
}

export function ArticleContents({ article }: { article: Article }) {
  if (article.sections.length < 3) return null;
  return (
    <nav className="article-contents" aria-label="Table of contents">
      <h2>On this page</h2>
      <ol>
        {article.sections.map((section, index) => (
          <li key={articleSectionId(section.heading, index)}>
            <a
              href={`#${articleSectionId(section.heading, index)}`}
              onClick={() =>
                document
                  .getElementById(articleSectionId(section.heading, index))
                  ?.focus({ preventScroll: true })
              }
            >
              {section.heading}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#key-takeaways"
            onClick={() => document.getElementById("key-takeaways")?.focus({ preventScroll: true })}
          >
            Key takeaways
          </a>
        </li>
      </ol>
    </nav>
  );
}
