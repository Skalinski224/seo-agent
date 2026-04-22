// PATH: src/lib/generate/validate-input.ts

import { GenerateInput } from "./types";

export function validateGenerateInput(input: GenerateInput) {
  if (!input.topic || typeof input.topic !== "string") {
    throw new Error("Brak pola topic");
  }

  if (input.topic.trim().length < 3) {
    throw new Error("Topic jest za krótki");
  }

  if (input.topic.length > 200) {
    throw new Error("Topic jest za długi");
  }

  if (!input.brief || typeof input.brief !== "object") {
    throw new Error("Brak pola brief");
  }

  if (!input.brief.goal || typeof input.brief.goal !== "string") {
    throw new Error("Brak pola brief.goal");
  }

  if (input.brief.goal.trim().length < 3) {
    throw new Error("brief.goal jest za krótki");
  }

  if (!input.brief.audience || typeof input.brief.audience !== "string") {
    throw new Error("Brak pola brief.audience");
  }

  if (input.brief.audience.trim().length < 3) {
    throw new Error("brief.audience jest za krótki");
  }

  if (!input.brief.tone || typeof input.brief.tone !== "string") {
    throw new Error("Brak pola brief.tone");
  }

  if (input.brief.tone.trim().length < 3) {
    throw new Error("brief.tone jest za krótki");
  }
}