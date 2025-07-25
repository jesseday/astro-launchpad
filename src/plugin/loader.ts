export function storyLoader() {
  return {
    loader: async () => {
      // globs from the root of the project
      const stories = await import.meta.glob(["/src/**/*.story.astro"]);
      const entries = [];
      for (const path in stories) {
        const name = path.split("/").pop()?.replace(/\.story\.astro$/, "");
        if (!name) {
          continue;
        }

        const entry = {
          id: name?.toLowerCase(),
          name,
          path,
        };
        entries.push(entry);
      }

      return entries;
    },
  };
}