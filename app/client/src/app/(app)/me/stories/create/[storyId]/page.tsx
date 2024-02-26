import { Box } from "@radix-ui/themes";

import fetchClient from "@/lib/fetchClient";
import { RedirectType, redirect } from "next/navigation";

const page = async ({
  params: { storyId },
}: {
  params: { storyId: string };
}) => {
  const res = await fetchClient("/stories", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      slug: storyId,
    }),
  });

  if (res.ok) {
    const data = await res.json();
    redirect(`/me/stories/edit/${data.story.slug}`, RedirectType.replace);
  }

  return <Box>Creating</Box>;
};

export default page;
