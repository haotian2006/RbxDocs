import { defineCollection, z as zod } from "astro:content";

const documents = defineCollection({
    type: "content",
    schema: zod.object({
        title: zod.string(),
        search: zod.boolean().default(true),
        author: zod.string().default("Anonymous"),
    }),
});

export const collections = {
    documents,
};
