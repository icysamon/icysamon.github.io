// src/app/article/page.tsx
import ArticleLayout from "@/app/components/articleLayout";

// ここにMarkdown形式で記事の文章を書きます
const mdContent = `
# リクエスト
現在依頼受付停止中。
`;

// 記事ページ本体（レイアウトコンポーネントに内容を渡すだけ）
export default function ArticlePage() {
  return <ArticleLayout content={mdContent} userLang="ja" />;
}