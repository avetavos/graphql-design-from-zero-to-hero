// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages project site. Update `site` to your GitHub username and `base`
  // to your repo name if they differ.
  site: 'https://avetavos.github.io',
  base: '/graphql-design-from-zero-to-hero',
  output: 'static',
  integrations: [starlight({
      title: 'GraphQL Design — From Zero to Hero',
      head: [
        { tag: 'script', attrs: { type: 'module', src: '/graphql-design-from-zero-to-hero/enhance.js' } },
        { tag: 'link', attrs: { rel: 'manifest', href: '/graphql-design-from-zero-to-hero/manifest.webmanifest' } },
        { tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/graphql-design-from-zero-to-hero/apple-touch-icon.png' } },
        { tag: 'link', attrs: { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/graphql-design-from-zero-to-hero/icon-192.png' } },
        { tag: 'meta', attrs: { name: 'theme-color', content: '#E10098' } },
        { tag: 'meta', attrs: { name: 'mobile-web-app-capable', content: 'yes' } },
        { tag: 'meta', attrs: { name: 'apple-mobile-web-app-capable', content: 'yes' } },
        { tag: 'meta', attrs: { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' } },
        { tag: 'meta', attrs: { name: 'apple-mobile-web-app-title', content: "GraphQL Design" } },
        { tag: 'script', content: "if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/graphql-design-from-zero-to-hero/sw.js',{scope:'/graphql-design-from-zero-to-hero/'}).catch(function(){})})}" },
      ],
      defaultLocale: 'en',
      locales: {
        en: { label: 'English', lang: 'en' },
        th: { label: 'ไทย', lang: 'th' },
      },
      customCss: ['./src/styles/custom.css'],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/avetavos/graphql-design-from-zero-to-hero' }],
      sidebar: [
        { label: 'GraphQL Foundations', items: [{ autogenerate: { directory: 'graphql-foundations' } }] },
        { label: 'Schema Design', items: [{ autogenerate: { directory: 'schema-design' } }] },
        { label: 'Queries & Resolvers', items: [{ autogenerate: { directory: 'queries-and-resolvers' } }] },
        { label: 'Mutations & Subscriptions', items: [{ autogenerate: { directory: 'mutations-and-subscriptions' } }] },
        { label: 'Pagination & Relationships', items: [{ autogenerate: { directory: 'pagination-and-relationships' } }] },
        { label: 'Errors & Validation', items: [{ autogenerate: { directory: 'errors-and-validation' } }] },
        { label: 'Security & Performance', items: [{ autogenerate: { directory: 'security-and-performance' } }] },
        { label: 'Tooling, Federation & Building', items: [{ autogenerate: { directory: 'tooling-federation-building' } }] },
      ],
      }), preact()],
});