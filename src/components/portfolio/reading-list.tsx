import { useEffect, useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { articles } from "@/content/articles";

export const READING_LIST_KEY = "codertech-reading-list-v1";
const changeEvent = "codertech-reading-list-change";

export function parseReadingList(raw: string | null): string[] {
  try {
    const value: unknown = JSON.parse(raw ?? "[]");
    if (!Array.isArray(value)) return [];
    return [
      ...new Set(
        value.filter(
          (slug): slug is string =>
            typeof slug === "string" && articles.some((article) => article.slug === slug),
        ),
      ),
    ];
  } catch {
    return [];
  }
}

export function useReadingList() {
  const [saved, setSaved] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const refresh = () => {
      try {
        setSaved(parseReadingList(localStorage.getItem(READING_LIST_KEY)));
        setError("");
      } catch {
        setError("Saving on this device is unavailable.");
      }
      setReady(true);
    };
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener(changeEvent, refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(changeEvent, refresh);
    };
  }, []);
  const toggle = (slug: string) => {
    try {
      const current = parseReadingList(localStorage.getItem(READING_LIST_KEY));
      const next = current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug];
      localStorage.setItem(READING_LIST_KEY, JSON.stringify(next));
      setSaved(next);
      setError("");
      window.dispatchEvent(new Event(changeEvent));
      return true;
    } catch {
      setError("Could not save changes on this device. Please try again.");
      return false;
    }
  };
  return { saved, ready, error, toggle };
}

export function SaveArticle({ slug, title }: { slug: string; title: string }) {
  const { saved, ready, error, toggle } = useReadingList();
  const [message, setMessage] = useState("");
  const isSaved = saved.includes(slug);
  return (
    <div className="save-article">
      <Button
        variant="portfolioOutline"
        disabled={!ready}
        aria-pressed={isSaved}
        aria-label={isSaved ? `Remove ${title} from reading list` : `Save ${title} to reading list`}
        onClick={() => {
          if (toggle(slug))
            setMessage(isSaved ? "Removed from your reading list." : "Saved on this device.");
        }}
      >
        {isSaved ? <BookmarkCheck aria-hidden="true" /> : <Bookmark aria-hidden="true" />}
        {isSaved ? "Saved" : "Save article"}
      </Button>
      <p className="reading-list-status" role="status">
        {error || message}
      </p>
    </div>
  );
}
