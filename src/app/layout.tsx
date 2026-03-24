import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "icysamon",
  description: "icysamon's homepage.",
  metadataBase: new URL('https://icysamon.com'),
  alternates: {
    canonical: '/',
    languages: {
      'ja': '/ja', 
      'en': '/en',
      'x-default': '/', 
    },
  },
  openGraph: {
    title: 'icysamon',
    description: 'icysamon\'s homepage.',
    url: 'https://icysamon.com',
    siteName: 'icysamon',
    images: [
      {
        url: 'https://image.icysamon.com/avatar/artist.webp',
        width: 800,
        height: 800,
        alt: 'icysamon avatar',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}