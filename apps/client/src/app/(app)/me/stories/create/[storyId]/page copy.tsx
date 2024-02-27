import TPInput from "@/components/TPInput";
import { Box, Flex } from "@radix-ui/themes";
import React from "react";
import { marked } from "marked";
import { getParsedMarkdown } from "@/lib/parseMarkdown";
import Client from "./Client";
import fetchClient from "@/lib/fetchClient";
import { RedirectType, redirect } from "next/navigation";
const doc = `
![Alt text](https://www.hindustantimes.com/ht-img/img/2024/02/24/550x309/Prime-Minister-Narendra-Modi-during-the-inaugurati_1708774418254.jpg)
Marked - Markdown Parser
========================

[Marked] lets you convert [Markdown] into HTML.  Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML.  This demo page will let you type anything you like and see how it gets converted.  Live.  No more waiting around.

### How To Use The Demo
-------------------

1. Type in stuff on the left.
2. See the live updates on the right.

That's it.  Pretty simple.  There's also a drop-down option above to switch between various views:

- **Preview:**  A live display of the generated HTML as it would render in a browser.
- **HTML Source:**  The generated HTML before your browser makes it pretty.
- **Lexer Data:**  What [marked] uses internally, in case you like gory stuff like this.
- **Quick Reference:**  A brief run-down of how to format things using markdown.

Why Markdown?
-------------

It's easy.  It's not overly bloated, unlike HTML.  Also, as the creator of [markdown] says,

> The overriding design goal for Markdown's
> formatting syntax is to make it as readable
> as possible. The idea is that a
> Markdown-formatted document should be
> publishable as-is, as plain text, without
> looking like it's been marked up with tags
> or formatting instructions.

Ready to start writing?  Either start changing stuff on the left or
[clear everything](/demo/?text=) with a simple click.

[Marked]: https://github.com/markedjs/marked/
[Markdown]: http://daringfireball.net/projects/markdown/

`;
const page = async ({
  params: { storyId },
}: {
  params: { storyId: string };
}) => {
  const res = await fetchClient("/stories", {
    method: "POST",
    body: JSON.stringify({
      slug: storyId,
    }),
  });

  if (res.ok) {
    const data = await res.json();
    redirect(`/me/stories/edit/${data.slug}`, RedirectType.replace);
  }
  // @ts-ignore
  const parseDoc: any = getParsedMarkdown(doc);

  return (
    <Box>
      Creating
      {/* <Client content={parseDoc.value} /> */}
      {/* <div
        dangerouslySetInnerHTML={{
          __html: getParsedMarkdown(doc) ?? " ",
        }}
      /> */}
    </Box>
  );
};

export default page;
