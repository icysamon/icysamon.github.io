import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default async function RootPage() {
  // ブラウザから送信された Accept-Language リクエストヘッダーを取得
  const headerList = await headers();
  const acceptLanguage = headerList.get('accept-language') || '';

  // 日本語が優先されているかを判定（日本語の場合は /ja、それ以外はデフォルトで /en へ）
  const isJapanese = acceptLanguage.includes('ja');
  const targetLang = isJapanese ? 'ja' : 'en';

  // リダイレクトを実行（/ja または /en へ自動遷移）
  redirect(`/${targetLang}`);
}