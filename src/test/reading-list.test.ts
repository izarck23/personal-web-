import { describe, expect, it } from "vitest";
import { parseReadingList } from "@/components/portfolio/reading-list";
import { articleSectionId } from "@/components/portfolio/article-contents";

describe("Device reading list", () => {
  it("restores valid saved articles and removes duplicates and missing articles", () => {
    expect(
      parseReadingList(
        '["ai-assisted-coding-workflow","missing","ai-assisted-coding-workflow",25]',
      ),
    ).toEqual(["ai-assisted-coding-workflow"]);
  });
  it("handles corrupt device storage safely", () => {
    expect(parseReadingList("{broken")).toEqual([]);
    expect(parseReadingList("null")).toEqual([]);
  });
  it("keeps repeated section headings uniquely addressable", () => {
    expect(articleSectionId("Start here", 0)).toBe("section-1-start-here");
    expect(articleSectionId("Start here", 1)).toBe("section-2-start-here");
  });
});
