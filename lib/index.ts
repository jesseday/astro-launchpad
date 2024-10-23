import { loadEnv } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import type { HookParameters } from "astro";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type ModuleInterface = {
  story: {
    name: string;
    description: string;
  };
};

export function storyLoader() {
  return {
    loader: async () => {
      // globs from the root of the project
      const stories = await import.meta.glob(["/src/**/*.story.astro"]);

      const entries = [];
      for (const path in stories) {
        const entry = stories[path]().then((mod) => {
          const definition = mod as ModuleInterface;
          return {
            id: definition?.story?.name.toLowerCase(),
            ...definition?.story,
            path,
          };
        });
        entries.push(entry);
      }

      return Promise.all(entries);
    },
  };
}

/**
 * Astro plugin that generates a route for isolation mode.
 *
 * The route is only injected in preview mode.
 *
 *
 * @see https://docs.astro.build/reference/api-plugins#hooks
 * @returns {import("astro/types").Plugin}
 */
interface LaunchpadPluginOptions {
  previewCallback?: () => boolean;
  pathPrefix?: string;
  routeEntryPoint?: string;
  prerender?: boolean;
}
export function generateIsolationRoutes(options: LaunchpadPluginOptions) {
  const isPreview = getIsPreview(options?.previewCallback);
  const routePattern = `/${
    options?.pathPrefix || "isolation"
  }/[...component]`.replaceAll(/\/+/g, "/");
  const routeEntryPoint =
    options?.routeEntryPoint || path.join(__dirname, "../templates/Page.astro");

  console.log({ routePattern });
  console.log({ routeEntryPoint });

  return {
    name: "generate-isolation-routes",
    hooks: {
      "astro:config:setup": ({
        injectRoute,
      }: HookParameters<"astro:config:setup">) => {
        if (!isPreview) {
          return;
        }

        injectRoute({
          pattern: routePattern,
          entrypoint: routeEntryPoint,
          prerender: options?.prerender || false,
        });
      },
    },
  };
}

function getIsPreview(previewCallback?: () => boolean) {
  if (previewCallback) {
    return previewCallback();
  }

  const { PREVIEW } = loadEnv(process.env.NODE_ENV || "", process.cwd(), "");

  console.log({ PREVIEW });
  return PREVIEW === "true";
}
