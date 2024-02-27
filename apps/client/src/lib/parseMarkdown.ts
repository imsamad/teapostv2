import { defaultSchema } from "rehype-sanitize";

import { unified } from "unified";
import { VFile } from "vfile";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import emoji from "remark-emoji";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";

type getParsedMarkdownProps = (
  content: string | undefined,
  gfmState: boolean,
  rrState: boolean
) => VFile | null;

export const getParsedMarkdown: getParsedMarkdownProps = (content) => {
  if (!content) return null;

  const parsedContent = unified()
    .use(remarkParse)
    .use(remarkRehype, {
      allowDangerousHtml: true,
    })
    .use(rehypeHighlight)
    .use(emoji, {
      emoticon: true,
    })
    .use(remarkGfm)
    .use(rehypeRaw)
    .use(rehypeSanitize)
    // .use(rehypeSanitize, sanitizeSchema)
    .use(rehypeStringify)
    .processSync(content);

  return parsedContent;
};

const allowedLanguagesToken = [
  "language-ino",
  "language-h",
  "language-console",
  "language-cc",
  "language-c++",
  "language-cpp",
  "language-cs",
  "language-c#",
  "language-css",
  "language-diff",
  "language-patch",
  "language-gp",
  "language-golang",
  "language-graphql",
  "language-gql",
  "language-html",
  "language-toml",
  "language-json",
  "language-java",
  "language-javascript",
  "language-js",
  "language-jsx",
  "language-kotlin",
  "language-kt",
  "language-kts",
  "language-less",
  "language-lua",
  "language-md",
  "language-markdown",
  "language-mkdown",
  "language-mkd",
  "language-perl",
  "language-pl",
  "language-pm",
  "language-php",
  "language-py",
  "language-python",
  "language-python-repl",
  "language-r",
  "language-R",
  "language-rss",
  "language-ruby",
  "language-rb",
  "language-rust",
  "language-rs",
  "language-scss",
  "language-shell",
  "language-svg",
  "language-sh",
  "language-sql",
  "language-SQL",
  "language-swift",
  "language-typescript",
  "language-ts",
  "language-tsx",
  "language-wasm",
  "language-xml",
  "language-xhtml",
  "language-yaml",
];

const allowedHljsTokens = [
  "hljs-addition",
  "hljs-attr",
  "hljs-attribute",
  "hljs-built_in",
  "hljs-bullet",
  "hljs-char",
  "hljs-code",
  "hljs-comment",
  "hljs-deletion",
  "hljs-doctag",
  "hljs-emphasis",
  "hljs-formula",
  "hljs-keyword",
  "hljs-link",
  "hljs-literal",
  "hljs-meta",
  "hljs-name",
  "hljs-number",
  "hljs-operator",
  "hljs-params",
  "hljs-property",
  "hljs-punctuation",
  "hljs-quote",
  "hljs-regexp",
  "hljs-section",
  "hljs-selector-attr",
  "hljs-selector-class",
  "hljs-selector-id",
  "hljs-selector-pseudo",
  "hljs-selector-tag",
  "hljs-string",
  "hljs-strong",
  "hljs-subst",
  "hljs-symbol",
  "hljs-tag",
  "hljs-template-tag",
  "hljs-template-variable",
  "hljs-title",
  "hljs-type",
  "hljs-variable",
];

const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [
      ...(defaultSchema?.attributes?.code || []),
      // List of all allowed tokens for <code> tags:
      ["className", "hljs", ...allowedLanguagesToken],
    ],
    span: [
      ...(defaultSchema?.attributes?.span || []),
      // List of all allowed tokens for <span> tags:
      ["className", ...allowedHljsTokens],
    ],
  },
};
