import { Icon } from "astro-icon/components";
import { defineCollection, z as zod } from "astro:content";

const documents = defineCollection({
    type: "content",
    schema: zod.object({
        title: zod.string(),
        search: zod.boolean().default(true),
        thumbnail: zod.string().default("WorkInProgress.webp"),
        author: zod
            .union([
                zod.string().regex(/^(?:discord|github): ([0-9]+)$/),
                zod.string().regex(/^author: .+$/i),
            ])
            .optional(),
    }),
});

const tags = defineCollection({
    type: "content",
    schema: zod.object({
        title: zod.string(),
        search: zod.boolean().default(true),

        author: zod
            .union([
                zod.string().regex(/^(?:discord|github): ([0-9]+)$/),
                zod.string().regex(/^author: .+$/i),
            ])
            .optional(),
    }),
});

export const collections = {
    documents,
    tags,
};
