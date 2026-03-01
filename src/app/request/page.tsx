// src/app/article/page.tsx
import ArticleLayout from "@/app/components/articleLayout";

// ここにMarkdown形式で記事の文章を書きます
const pageContent = `
# テスト用ページ
テスト。

\`\`\`c
#include <stdio.h>
\`\`\`
`;

// 記事ページ本体（レイアウトコンポーネントに内容を渡すだけ）
export default function ArticlePage({ params }: { params: { lang: string } }) {
  return <ArticleLayout content={pageContent} userLang="ja" />;
}