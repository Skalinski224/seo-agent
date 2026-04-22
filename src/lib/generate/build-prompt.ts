// PATH: src/lib/generate/build-prompt.ts

import { GenerateInput } from "./types";

export function buildPrompt(input: GenerateInput) {
  return `
Napisz krótki szkic artykułu blogowego po polsku.

Temat:
"${input.topic}"

Brief:
- Cel: ${input.brief.goal}
- Odbiorca: ${input.brief.audience}
- Ton: ${input.brief.tone}

Wymagania:
- pisz prostym, konkretnym językiem
- bez lania wody
- dopasuj styl do odbiorcy
- realizuj cel briefu
- unikaj ogólników
- treść ma być użyteczna i praktyczna

Zwróć WYŁĄCZNIE poprawny JSON.
Bez komentarzy.
Bez markdowna.
Bez \`\`\`.

Dokładny format odpowiedzi:
{
  "title": "krótki tytuł",
  "intro": "krótki wstęp, 2-3 zdania",
  "sections": [
    {
      "heading": "nagłówek sekcji 1",
      "content": "treść sekcji 1, 2-4 zdania"
    },
    {
      "heading": "nagłówek sekcji 2",
      "content": "treść sekcji 2, 2-4 zdania"
    },
    {
      "heading": "nagłówek sekcji 3",
      "content": "treść sekcji 3, 2-4 zdania"
    }
  ],
  "conclusion": "krótkie podsumowanie, 2-3 zdania"
}

Zasady struktury:
- title: 5-12 słów
- intro: 2-3 zdania
- sections: dokładnie 3 sekcje
- każda sekcja musi mieć heading i content
- conclusion: 2-3 zdania
`;
}