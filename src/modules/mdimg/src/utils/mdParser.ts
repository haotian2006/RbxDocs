import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      console.log(language);
      return hljs.highlight(code, { language }).value;
    }
  })
);

const parseMarkdown = async (mdText: string) => {
  return marked.parse(mdText);
};

export { parseMarkdown };
