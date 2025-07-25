# Astro Launchpad

An Astro plugin that provides a lightweight, Astro-centric documentation
and discovery experience for Astro component libraries.


## Comparison to Astrobook

Astrobook is useful and I've had the chance to work with it on a large
component library.  The problem that I found is that once the library
got big enough, performance suffered, particularly hot-reload.  I believe
this is because the plugin was doing a lot of work to create virtual routes,
a symptom of the choice to try maintain compatibility with the Storybook api.

Launchpad does not attempt to have the same API as Storybook.  Instead it uses
native Astro components and routing, with thin layout wrappers, to display
component's in isolation.  In my experience, this has lead to better
performance than creating virtual routes.
