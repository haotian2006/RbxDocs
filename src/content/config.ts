import { defineCollection, z as zod } from "astro:content";

const documents = defineCollection({
    type: "content",
    schema: zod.object({
        title: zod.string(),
        search: zod.boolean().default(true),
        thumbnail: zod
            .string()
            .default(
                "https://media.discordapp.net/attachments/1273764068775165992/1276341773521653842/New_Project.png?ex=66c92d68&is=66c7dbe8&hm=6054564bb1cae9c93a76cd0a1ba8d44667cfaf6ba46a4d5529a79096df17d37a&=&format=webp&quality=lossless&width=767&height=767",
            ),

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
