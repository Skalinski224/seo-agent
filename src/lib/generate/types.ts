//src/lib/generate/types.ts//
export type GenerateBrief = {
    goal: string;
    audience: string;
    tone: string;
  };
  
  export type GenerateInput = {
    topic: string;
    brief: GenerateBrief;
  };
  
  export type ArticleSection = {
    heading: string;
    content: string;
  };
  
  export type GeneratedArticle = {
    title: string;
    intro: string;
    sections: ArticleSection[];
    conclusion: string;
  };
  
  export type GenerateResult = {
    article: GeneratedArticle;
  };