import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const OWNER_INBOX = "codingspace254@gmail.com";
const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(1).max(5000),
});

export const sendInquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_submissions").insert(data);
    if (error) {
      console.error("contact insert failed", error);
      return { ok: false as const };
    }
    let forwarded = false;
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${OWNER_INBOX}`, {
        method: "POST",
        signal: AbortSignal.timeout(8000),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Referer: (process.env.APP_URL || "https://codertech.dev").replace(/\/+$/, "") + "/",
          Origin: (process.env.APP_URL || "https://codertech.dev").replace(/\/+$/, ""),
        },
        body: JSON.stringify({
          _subject: `New CoderTech inquiry from ${data.name}`,
          _replyto: data.email,
          _template: "table",
          _captcha: "false",
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });
      const body = await res.text();
      forwarded = res.ok && body.includes('"success":"true"');
      if (!forwarded) console.error("formsubmit", res.status, body.slice(0, 300));
    } catch (e) {
      console.error("formsubmit error", e);
    }
    return { ok: true as const, forwarded };
  });
