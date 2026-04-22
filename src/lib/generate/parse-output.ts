// PATH: src/lib/generate/parse-output.ts

import { GeneratedArticle } from "./types";

function extractJsonBlock(text: string) {
  const trimmed = text.trim();

  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    throw new Error("Model nie zwrócił poprawnego JSON");
  }

  return trimmed.slice(start, end + 1);
}

export function parseGeneratedArticle(rawText: string): GeneratedArticle {
  if (!rawText || typeof rawText !== "string") {
    throw new Error("Brak tekstu z modelu");
  }

  const jsonText = extractJsonBlock(rawText);

  let parsed: unknown;

  try {
    parsed = JSON.parse(jsonText);
  } catch {
    throw new Error("Nie udało się sparsować JSON z modelu");
  }

  if (!parsed || typeof parsed !== "object") {
    throw new Error("Niepoprawna struktura outputu");
  }

  return parsed as GeneratedArticle;
}