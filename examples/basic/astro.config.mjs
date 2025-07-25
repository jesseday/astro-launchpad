// @ts-check
import { defineConfig } from 'astro/config';
import { Launchpad } from 'astro-launchpad';

// https://astro.build/config
export default defineConfig({
  integrations: [Launchpad({
    routePrefix: 'components/docs',
    previewCallback: () => true,
  })]
});
