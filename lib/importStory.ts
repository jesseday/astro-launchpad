/**
 * @file Import stories in a vite-friendly way.
 * @description Imports stories in a way that vite can
 * track and bundle them.
 *
 * The storyLoader function in the plugin file is responsible
 * for generating a collection of stories and their metadata.
 * However, vite was not bundling the story output correctly
 * when using dynamic imports.  This file and import
 * function manages to import the stories in a way
 * that vite can statically analyze and
 * bundle them.
 *
 * @see https://vitejs.dev/guide/features.html#glob-import
 */
const modules = await import.meta.glob(["/src/**/*.story.astro"], {
  import: "default",
});

/**
 * Import a story from a given path, relative to the
 * project root.
 *
 * @returns {AstroComponentFactory} An astro component to
 *   be rendered by the AstroContainer.
 */
export function importStory(path: string) {
  return modules[path]();
}
