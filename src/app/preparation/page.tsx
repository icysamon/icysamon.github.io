// src/app/article/page.tsx
import ArticleLayout from "@/app/components/articleLayout";

// ここにMarkdown形式で記事の文章を書きます
const content = `
# 新曲準備中 🫧

待ってね！
`;

// 記事ページ本体（レイアウトコンポーネントに内容を渡すだけ）
export default function ArticlePage() {
  return <ArticleLayout content={content} userLang="ja" />;
}