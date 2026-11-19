import { useEffect, useId, useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ArticleSharing({ title, url }: { title: string; url: string }) {
  const [nativeAvailable, setNativeAvailable] = useState(false);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");
  const [manualCopy, setManualCopy] = useState(false);
  const statusId = useId();
  const inputId = useId();

  useEffect(() => {
    setNativeAvailable(typeof navigator.share === "function");
  }, []);

  async function copyUrl() {
    setBusy(true);
    setCopied(false);
    setMessage("");
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setManualCopy(false);
      setMessage("Article link copied.");
    } catch {
      setManualCopy(true);
      setMessage("Copying is unavailable. Select and copy the article link below.");
    } finally {
      setBusy(false);
    }
  }

  async function shareArticle() {
    setBusy(true);
    setMessage("");
    try {
      await navigator.share({ title, url });
      setMessage("Article shared.");
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        setMessage("Sharing canceled.");
      } else {
        setMessage("Sharing is unavailable. Copy the article link instead.");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="article-sharing" role="group" aria-label="Share this article">
      <div className="article-share-actions">
        <Button
          variant="portfolioOutline"
          onClick={copyUrl}
          disabled={busy}
          aria-label="Copy article URL"
          aria-describedby={statusId}
        >
          {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}Copy link
        </Button>
        {nativeAvailable && (
          <Button
            variant="portfolioOutline"
            onClick={shareArticle}
            disabled={busy}
            aria-label="Share article using your device"
            aria-describedby={statusId}
          >
            <Share2 aria-hidden="true" />
            Share article
          </Button>
        )}
      </div>
      <p
        id={statusId}
        className="article-share-status"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {message}
      </p>
      {manualCopy && (
        <div className="article-share-fallback">
          <label htmlFor={inputId}>Article link</label>
          <input
            id={inputId}
            readOnly
            value={url}
            onFocus={(event) => event.currentTarget.select()}
          />
        </div>
      )}
    </div>
  );
}
