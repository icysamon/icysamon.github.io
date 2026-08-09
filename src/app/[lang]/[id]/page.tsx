import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ArticleLayout from '@/components/articlelayout';

interface PageProps {
  params: Promise<{
    lang: string;
    id: string;
  }>;
}

// 静的エクスポート（GitHub Pages等）に必要な設定
export async function generateStaticParams() {
  return [
    { lang: 'ja', id: 'privacy-policy' },
    { lang: 'en', id: 'privacy-policy' },
  ];
}

export default async function Page({ params }: PageProps) {
  const { lang, id } = await params;
  const currentLang = lang === 'ja' ? 'ja' : 'en';

  // マークダウンファイル（例: src/data/pages/ja/request.md）を読み込む
  const filePath = path.join(
    process.cwd(),
    `src/data/pages/${currentLang}/${id}.md`
  );

  let content = '';

  try {
    const rawContent = fs.readFileSync(filePath, 'utf8');
    // Frontmatterが含まれる場合はメタデータを削除し、本文のみを取得
    const parsed = matter(rawContent);
    content = parsed.content;
  } catch {
    content = `# 404\nPage not found: ${id}`;
  }

  // UIコンポーネントをレンダリング
  return <ArticleLayout content={content} lang={currentLang} />;
}