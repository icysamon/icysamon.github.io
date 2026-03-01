// src/app/article/page.tsx
import ArticleLayout from "@/app/components/articleLayout";

// ここにMarkdown形式で記事の文章を書きます
const markdownJa = `
# テスト用ページ
テスト。

\`\`\`c
#include <stdio.h>
\`\`\`
`;

const markdownEn = `
# Test Page
test
`;

// 記事ページ本体（レイアウトコンポーネントに内容を渡すだけ）
export default function ArticlePage() {
  return <ArticleLayout contentJa={markdownJa} contentEn={markdownEn} />;
}