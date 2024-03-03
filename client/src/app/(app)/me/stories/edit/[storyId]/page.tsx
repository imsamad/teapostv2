import fetchClient from "@/lib/fetchClient";
import { Box, Grid, Heading } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import { TLooseStorySchema, TTagSchema } from "shared";

const StoryForm = dynamic(() => import("./EditStoryForm"), {
  ssr: false,
  loading: () => <Heading>Loading Form...</Heading>,
});

const StoryEditPage = async ({
  params: { storyId },
}: {
  params: {
    storyId: string;
  };
}) => {
  const res = await fetchClient(`/stories/${storyId}`);
  if (!res.ok) {
    return (
      <Box className="border-0 text-2xl font-extrabold italic text-red-300 border-red-400 h-full w-full mt-20 text-center">
        Story does not exist ...
      </Box>
    );
  }

  const story = (await res.json()) as TLooseStorySchema;

  const tags = (await (
    await fetchClient("/tags", {}, false)
  ).json()) as TTagSchema[];

  return (
    <>
      <Heading align="center">Edit</Heading>
      <StoryForm story={story} tags={tags} />
    </>
  );
};

export default StoryEditPage;
