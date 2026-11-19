import { describe, expect, it } from "vitest";
import { calculateReadingProgress } from "@/components/portfolio/reading-progress";

describe("Article reading progress", () => {
  it("starts at zero before reaching the article body", () => {
    expect(calculateReadingProgress(500, 2500, 800, 100)).toBe(0);
  });
  it("tracks the midpoint of the readable scroll distance", () => {
    expect(calculateReadingProgress(-550, 1450, 800, 100)).toBe(50);
  });
  it("finishes when the end of the article is visible", () => {
    expect(calculateReadingProgress(-1200, 800, 800, 100)).toBe(100);
  });
  it("never exceeds 100 when scrolling into related content", () => {
    expect(calculateReadingProgress(-2200, -200, 800, 100)).toBe(100);
  });
  it("handles articles shorter than the viewport without division by zero", () => {
    expect(calculateReadingProgress(100, 400, 800, 100)).toBe(100);
    expect(calculateReadingProgress(500, 800, 800, 100)).toBe(0);
  });
});
