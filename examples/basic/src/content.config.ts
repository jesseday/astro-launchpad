// 1. Import utilities from `astro:content`
import { defineCollection } from 'astro:content';
import { storyLoader } from 'astro-launchpad';
const components = defineCollection(storyLoader());

// 4. Export a single `collections` object to register your collection(s)
export const collections = { components };