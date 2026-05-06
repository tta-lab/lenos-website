// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // Project subpath deploy: tta-lab.github.io/lenos-website/
  site: 'https://tta-lab.github.io',
  base: '/lenos-website',

  integrations: [mdx()],

  vite: {
    plugins: [tailwindcss()],
  },
});
