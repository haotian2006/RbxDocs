import { defineCollection, z as zod } from "astro:content";

const documents = defineCollection({
    type: "content",
    schema: zod.object({
        title: zod.string(),
        search: zod.boolean().default(true),

        author_discord: zod.string().optional(),
        author_github: zod.string().optional(),
        
        author_data: zod.object({
            hasAuthor : zod.boolean().default(false),

            discord_user : zod.string().optional(),
            discord_ava : zod.string().optional(),

            github_user : zod.string().optional(),
        }).optional(),
    }),
});

export const collections = {
    documents,
};
