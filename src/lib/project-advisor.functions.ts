import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SERVICES = ["App Development", "Website Development", "Landing Pages"] as const;

const resultSchema = z.object({
  services: z.array(z.object({ name: z.enum(SERVICES), reason: z.string() })),
  inquiry: z.string(),
});
export type AdvisorResult = z.infer<typeof resultSchema> | { error: string };

const SYSTEM_INSTRUCTION = `You help prospective clients of Isaac, a Software & App Developer in Kenya. His only services: ${SERVICES.join(", ")}. Recommend 1-3 of those services that fit the client's needs, each with a one-sentence reason. Then draft a short, friendly inquiry (under 150 words) written by the client to Isaac, describing their needs. Never invent prices, timelines, past results or credentials for Isaac. Leave [Your name] as a placeholder.`;

export const recommendServices = createServerFn({ method: "POST" })
  .inputValidator((input: { needs: string }) => {
    const needs = String(input?.needs ?? "").trim();
    if (needs.length < 10 || needs.length > 2000)
      throw new Error("Please describe your project in 10–2000 characters.");
    return { needs };
  })
  .handler(async ({ data }): Promise<AdvisorResult> => {
    const geminiKey = process.env["GEMINI_API_KEY"];
    const openAiKey = process.env["OPENAI_API_KEY"];

    if (!geminiKey && !openAiKey) {
      return {
        error:
          "The AI project assistant is not configured yet. Please configure GEMINI_API_KEY in your server environment.",
      };
    }

    try {
      if (geminiKey) {
        const { GoogleGenAI, Type } = await import("@google/genai");
        const ai = new GoogleGenAI({ apiKey: geminiKey });
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: data.needs,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                services: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: {
                        type: Type.STRING,
                        enum: ["App Development", "Website Development", "Landing Pages"],
                      },
                      reason: { type: Type.STRING },
                    },
                    required: ["name", "reason"],
                  },
                },
                inquiry: { type: Type.STRING },
              },
              required: ["services", "inquiry"],
            },
          },
        });

        const parsed = JSON.parse(response.text ?? "{}");
        return resultSchema.parse(parsed);
      }

      if (openAiKey) {
        const { createOpenAI } = await import("@ai-sdk/openai");
        const { streamText, Output } = await import("ai");
        const provider = createOpenAI({ apiKey: openAiKey });
        const result = streamText({
          model: provider("gpt-4o-mini"),
          system: SYSTEM_INSTRUCTION,
          messages: [{ role: "user", content: data.needs }],
          output: Output.object({ schema: resultSchema }),
          maxRetries: 1,
        });
        return await result.output;
      }

      return { error: "No AI provider configured." };
    } catch (err) {
      console.error("Project advisor error:", err);
      const status =
        (err as { status?: number; statusCode?: number })?.status ??
        (err as { statusCode?: number })?.statusCode;
      if (status === 429) return { error: "The assistant is busy. Please try again in a minute." };
      if (status === 402)
        return { error: "The assistant is temporarily unavailable (credits exhausted)." };
      return { error: "The assistant could not answer right now. Please try again later." };
    }
  });
