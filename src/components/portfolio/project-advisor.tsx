import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Copy, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { recommendServices, type AdvisorResult } from "@/lib/project-advisor.functions";

export function ProjectAdvisor() {
  const run = useServerFn(recommendServices);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AdvisorResult | null>(null);
  const [status, setStatus] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const needs = String(new FormData(event.currentTarget).get("needs") ?? "");
    setLoading(true);
    setResult(null);
    setStatus("");
    try {
      setResult(await run({ data: { needs } }));
    } catch (e) {
      setResult({ error: e instanceof Error ? e.message : "Something went wrong." });
    } finally {
      setLoading(false);
    }
  }
  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("Draft copied. It has not been sent.");
    } catch {
      setStatus("Clipboard unavailable. Please select and copy the draft.");
    }
  }
  return (
    <div className="project-advisor">
      <div className="eyebrow">
        <Sparkles size={14} aria-hidden="true" /> AI project assistant
      </div>
      <h3>Not sure what you need? Describe your project.</h3>
      <form className="contact-form" onSubmit={submit}>
        <label>
          Your project needs
          <textarea
            name="needs"
            rows={4}
            required
            minLength={10}
            maxLength={2000}
            placeholder="e.g. I run a salon and want customers to book online…"
          />
        </label>
        <Button variant="portfolio" type="submit" disabled={loading}>
          {loading ? "Thinking…" : "Get recommendations"}
        </Button>
      </form>
      <div role="status" aria-live="polite">
        {result && "error" in result && <p className="form-status">{result.error}</p>}
        {result && !("error" in result) && (
          <div className="advisor-result">
            <h4>Recommended services</h4>
            <ul>
              {result.services.map((s) => (
                <li key={s.name}>
                  <strong>{s.name}</strong> — {s.reason}
                </li>
              ))}
            </ul>
            <h4>Your draft inquiry</h4>
            <textarea readOnly rows={7} value={result.inquiry} aria-label="Draft inquiry" />
            <Button variant="portfolioOutline" type="button" onClick={() => copy(result.inquiry)}>
              <Copy />
              Copy draft
            </Button>
            <p className="form-status">
              {status || "AI-generated suggestion. Review before using."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
