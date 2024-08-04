import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
    base: "MyDocs",
    server: {
        port: 3000,
        host: true,
    },
    site: "https://haotian2006.github.io",
    integrations: [tailwind(), react(), mdx(), icon()],
});
