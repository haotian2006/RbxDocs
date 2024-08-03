import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  base: "MyDocs",
  server: {
    port: 3000,
    host: true
  },
  site: "https://haotian2006.github.io",
  integrations: [tailwind(), react(), mdx(), icon()]
});