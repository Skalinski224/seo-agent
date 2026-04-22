// PATH: src/app/api/generate/route.ts

import { openai } from "@/lib/openai";
import { buildPrompt } from "@/lib/generate/build-prompt";
import { parseGeneratedArticle } from "@/lib/generate/parse-output";
import { qcOutput } from "@/lib/generate/qc-output";
import { GenerateInput } from "@/lib/generate/types";
import { validateGenerateInput } from "@/lib/generate/validate-input";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const input: GenerateInput = {
      topic: body.topic,
      brief: {
        goal: body.brief?.goal,
        audience: body.brief?.audience,
        tone: body.brief?.tone,
      },
    };

    validateGenerateInput(input);

    const prompt = buildPrompt(input);

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    const parsed = parseGeneratedArticle(response.output_text);
    const article = qcOutput(parsed);

    return Response.json({
      ok: true,
      data: article,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Błąd generowania";

    return Response.json(
      {
        ok: false,
        error: message,
      },
      { status: 400 }
    );
  }
}