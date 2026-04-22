// PATH: src/lib/generate/qc-output.ts

import { GeneratedArticle } from "./types";

function countSentences(text: string) {
  return text
    .split(/[.!?]+/)
    .filter((sentence) => sentence.trim().length > 0).length;
}

function assertText(value: unknown, fieldName: string) {
  if (!value || typeof value !== "string") {
    throw new Error(`Pole ${fieldName} jest niepoprawne`);
  }

  if (value.trim().length < 3) {
    throw new Error(`Pole ${fieldName} jest za krótkie`);
  }
}

export function qcOutput(article: GeneratedArticle) {
  if (!article || typeof article !== "object") {
    throw new Error("Brak artykułu");
  }

  assertText(article.title, "title");
  assertText(article.intro, "intro");
  assertText(article.conclusion, "conclusion");

  if (!Array.isArray(article.sections)) {
    throw new Error("Pole sections musi być tablicą");
  }

  if (article.sections.length !== 3) {
    throw new Error("Artykuł musi mieć dokładnie 3 sekcje");
  }

  if (article.title.trim().length > 120) {
    throw new Error("Tytuł jest za długi");
  }

  const introSentences = countSentences(article.intro);
  if (introSentences < 2 || introSentences > 4) {
    throw new Error("Intro ma niepoprawną liczbę zdań");
  }

  const conclusionSentences = countSentences(article.conclusion);
  if (conclusionSentences < 2 || conclusionSentences > 4) {
    throw new Error("Conclusion ma niepoprawną liczbę zdań");
  }

  article.sections.forEach((section, index) => {
    assertText(section.heading, `sections[${index}].heading`);
    assertText(section.content, `sections[${index}].content`);

    if (section.heading.trim().length > 120) {
      throw new Error(`Nagłówek sekcji ${index + 1} jest za długi`);
    }

    const sectionSentences = countSentences(section.content);
    if (sectionSentences < 2 || sectionSentences > 5) {
      throw new Error(`Sekcja ${index + 1} ma niepoprawną liczbę zdań`);
    }
  });

  return {
    ...article,
    title: article.title.trim(),
    intro: article.intro.trim(),
    conclusion: article.conclusion.trim(),
    sections: article.sections.map((section) => ({
      heading: section.heading.trim(),
      content: section.content.trim(),
    })),
  };
}