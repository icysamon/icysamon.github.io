// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import partytown from '@astrojs/partytown';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://icysamon.com',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), partytown({
    config: {
      forward: ["dataLayer.push"],
    },
  }), mdx()],
});