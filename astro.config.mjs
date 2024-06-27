import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
    base: "MyDocs",
    server: {
        port: 3000,
        host: true,
    },
    site: "https://haotian2004.github.io",
});
