import { defineCollection } from "astro:content";

const documents = defineCollection({
    type: "content",
});

export const collections = {
    documents,
};
