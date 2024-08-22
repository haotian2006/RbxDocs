import { defineCollection, z as zod } from "astro:content";

const documents = defineCollection({
    type: "content",
    schema: zod.object({
        title: zod.string(),
        search: zod.boolean().default(true),
        thumbnail: zod.string().default("none"),

        author: zod
            .string()
            .regex(/(?:discord|github): ([0-9]+)/)
            .optional(),
    }),
});

const tags = defineCollection({
    type: "content",
    schema: zod.object({
        title: zod.string(),
        search: zod.boolean().default(true),

        author: zod
            .string()
            .regex(/(?:discord|github): ([0-9]+)/)
            .optional(),
    }),
});

export const collections = {
    documents,
    tags,
};
