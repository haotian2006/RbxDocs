/* eslint-disable @typescript-eslint/no-require-imports, no-undef */

const mdimg = require("./modules/mdimg/lib/mdimg.cjs");
const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, 'content/tags');

function getCollection() {
  return fs.readdirSync(contentDir).map(file => {
    const filePath = path.join(contentDir, file);
    return {
      slug: file.replace('.md', ''),
      body: fs.readFileSync(filePath, 'utf8').replace(/---[\s\S]*?---/g, '').trim()
    };
  });
}

const tags = getCollection()

tags.forEach(async tag => (
     await mdimg.mdimg({
        inputText: tag.body,
        outputFilename: `public/tag_thumbs/${tag.slug}.webp`,
        type: "webp",
        width: 600,
        height: 600,
        cssTemplate: "githubDarkWH"
    })
)
)