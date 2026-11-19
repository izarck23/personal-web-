import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { socialProfiles } from "@/components/portfolio/social";
import { articles, relatedArticles } from "@/content/articles";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("uses only Isaac's three verified social destinations", () => {
    expect(socialProfiles.map((profile) => profile.url)).toEqual([
      "https://www.youtube.com/@ISAACSIMIYU25",
      "https://www.tiktok.com/@izarcsimiyu",
      "https://www.facebook.com/profile.php?id=100092690888627",
    ]);
  });

  it("matches every article and keeps related links within the article collection", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(articles.length).toBe(10);
    for (const article of articles) {
      expect(router.matchRoutes(`/blog/${article.slug}`).at(-1)?.routeId).toBe("/blog/$slug");
      const related = relatedArticles(article);
      expect(related.length).toBe(3);
      for (const other of related) {
        expect(other.slug).not.toBe(article.slug);
        expect(articles.some((candidate) => candidate.slug === other.slug)).toBe(true);
      }
    }
  });
});
