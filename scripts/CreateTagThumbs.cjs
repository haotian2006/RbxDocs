/* eslint-disable @typescript-eslint/no-require-imports, no-undef */
const mdimg = require("../src/modules/mdimg/lib/mdimg.cjs");
const fs = require("fs");
const path = require("path");

const contentDir = path.join(__dirname, "../src/content/tags");
const imageDir = path.join(__dirname, "../public/tag_thumbs");

if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
}

const getCollection = () => {
    return fs.readdirSync(contentDir).map(file => {
        const filePath = path.join(contentDir, file);
        return {
            slug: file.replace(".md", ""),
            body: fs
                .readFileSync(filePath, "utf8")
                .replace(/---[\s\S]*?---/g, "")
                .trim(),
            filePath,
        };
    });
};

const tags = getCollection();

for (const tag of tags) {
    const outputImagePath = path.join(imageDir, `${tag.slug}.webp`);
    if (fs.existsSync(outputImagePath)) {
        const tagFileStats = fs.statSync(tag.filePath);
        const imageFileStats = fs.statSync(outputImagePath);

        if (tagFileStats.mtime <= imageFileStats.mtime) {
            continue;
        }
    }

    console.log(`Generating image for ${tag.slug}...`);
    mdimg.mdimg({
        inputText: tag.body,
        outputFilename: outputImagePath,
        type: "webp",
        width: 600,
        height: 600,
        cssTemplate: "githubDarkWH",
    });
    console.log(`Generated image for ${tag.slug}`);
}
