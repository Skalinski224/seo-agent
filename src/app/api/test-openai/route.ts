import OpenAI from "openai";

export async function GET() {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: "Napisz jedno krótkie zdanie po polsku: test połączenia działa.",
    });

    return Response.json({
      ok: true,
      result: response.output_text,
    });
  } catch (error) {
    console.error("OpenAI test error:", error);

    return Response.json(
      {
        ok: false,
        error: "Błąd połączenia z OpenAI",
      },
      { status: 500 }
    );
  }
}