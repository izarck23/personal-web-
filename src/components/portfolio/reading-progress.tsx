import { useEffect, useState, type RefObject } from "react";

// Finish when the article's end is visible; exclude related posts and the footer.
export function calculateReadingProgress(
  top: number,
  bottom: number,
  viewportHeight: number,
  readingLine: number,
) {
  const distance = bottom - top - viewportHeight + readingLine;
  if (distance <= 0) return top <= readingLine ? 100 : 0;
  return Math.round(Math.min(100, Math.max(0, ((readingLine - top) / distance) * 100)));
}

export function ReadingProgress({ bodyRef }: { bodyRef: RefObject<HTMLDivElement | null> }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = body.getBoundingClientRect();
      const header = document.querySelector(".site-header");
      const readingLine = (header?.getBoundingClientRect().bottom ?? 0) + 16;
      setProgress(calculateReadingProgress(rect.top, rect.bottom, window.innerHeight, readingLine));
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.cancelAnimationFrame(frame);
    };
  }, [bodyRef]);

  return (
    <progress
      className="article-reading-progress"
      max={100}
      value={progress}
      tabIndex={0}
      aria-label="Article reading progress"
      aria-valuetext={`${progress}% of article scrolled`}
      title={`Reading progress: ${progress}%`}
    >
      {progress}%
    </progress>
  );
}
