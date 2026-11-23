// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import partytown from '@astrojs/partytown';

import mdx from '@astrojs/mdx';
import { satteri } from '@astrojs/markdown-satteri';
import { alerts } from './src/plugins/alerts.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://icysamon.com',
  markdown: {
    // "> [!WARNING]" etc. become alert panels like the blog's
    processor: satteri({ hastPlugins: [alerts] }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), partytown({
    config: {
      forward: ["dataLayer.push"],
    },
  }), mdx()],
});