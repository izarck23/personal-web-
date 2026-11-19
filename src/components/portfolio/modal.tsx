import * as Dialog from "@radix-ui/react-dialog";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Send, X } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { sendInquiry } from "@/lib/contact.functions";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export type PortfolioLink = { label: string; href: string; download?: boolean };
export type PortfolioDetail = {
  title: string;
  category: string;
  description: string;
  image?: string;
  body: string[];
  links?: PortfolioLink[];
  templateSlug?: string;
};
export function DetailModal({
  detail,
  onClose,
}: {
  detail: PortfolioDetail | null;
  onClose: () => void;
}) {
  return (
    <Dialog.Root
      open={detail !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay" />
        <Dialog.Content className="modal-content">
          <Dialog.Close asChild>
            <Button
              variant="portfolioIcon"
              size="icon"
              className="modal-close"
              aria-label="Close details"
            >
              <X />
            </Button>
          </Dialog.Close>
          <div className="eyebrow">{detail?.category}</div>
          <Dialog.Title>{detail?.title}</Dialog.Title>
          <Dialog.Description>{detail?.description}</Dialog.Description>
          {detail?.image && (
            <img
              className="modal-image"
              src={detail.image}
              alt={detail.title}
              width={1280}
              height={960}
            />
          )}
          {detail?.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {detail?.templateSlug && (
            <Button variant="portfolio" asChild>
              <Link to="/templates/$slug" params={{ slug: detail.templateSlug }}>
                Preview & template details
                <ArrowUpRight />
              </Link>
            </Button>
          )}
          {detail?.links && detail.links.length > 0 && (
            <div className="modal-links">
              {detail.links.map((link) => (
                <Button
                  key={link.href}
                  variant={link.download ? "portfolioOutline" : "portfolio"}
                  asChild
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={link.download || undefined}
                    aria-label={`${link.label} (opens in a new tab)`}
                  >
                    {link.label}
                    <ArrowUpRight />
                  </a>
                </Button>
              ))}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
export function InquiryModal({
  open,
  onClose,
  projectName,
}: {
  open: boolean;
  onClose: () => void;
  projectName?: string | undefined;
}) {
  const send = useServerFn(sendInquiry);
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState(false);
  const [copying, setCopying] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setCopying(true);
    setCopied(false);
    setStatus("Sending your message…");
    try {
      const result = await send({
        data: {
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          message: String(data.get("message") ?? ""),
        },
      });
      if (result.ok) {
        setCopied(true);
        setStatus("Thanks! Your message was sent. Isaac will reply by email.");
        form.reset();
      } else setStatus("Sorry, your message could not be sent. Please try again.");
    } catch {
      setStatus("Please check your details and try again.");
    } finally {
      setCopying(false);
    }
  }
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          onClose();
          setStatus("");
          setCopied(false);
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay" />
        <Dialog.Content className="modal-content">
          <Dialog.Close asChild>
            <Button
              variant="portfolioIcon"
              size="icon"
              className="modal-close"
              aria-label="Close inquiry"
            >
              <X />
            </Button>
          </Dialog.Close>
          <div className="eyebrow">Employment & freelance inquiries</div>
          <Dialog.Title>
            Tell me about your <span className="orange">opportunity.</span>
          </Dialog.Title>
          <Dialog.Description>Send me a message and I’ll reply by email.</Dialog.Description>
          <form
            className="contact-form"
            onSubmit={submit}
            onChange={() => {
              setCopied(false);
              setStatus("");
            }}
          >
            <label>
              Your name
              <input
                name="name"
                autoComplete="name"
                placeholder="Alex Taylor"
                required
                maxLength={100}
              />
            </label>
            <label>
              Email address
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                maxLength={254}
              />
            </label>
            <label>
              What do you have in mind?
              <textarea
                key={projectName}
                name="message"
                rows={4}
                defaultValue={
                  projectName
                    ? `I'd like a project based on the ${projectName}. My requirements are: `
                    : ""
                }
                placeholder="A little about your project, goals, and timeline…"
                required
                maxLength={5000}
              />
            </label>
            <Button variant="portfolio" type="submit" disabled={copying}>
              {copied ? <Check /> : <Send />}
              {copying ? "Sending…" : copied ? "Sent" : "Send message"}
              <ArrowUpRight />
            </Button>
            <div className="form-status" role="status">
              {status}
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
