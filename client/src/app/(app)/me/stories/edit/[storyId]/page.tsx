import fetchClient from "@/lib/fetchClient";
import { Box, Grid, Heading } from "@radix-ui/themes";

const StoryEditPage = async ({
  params: { storyId },
}: {
  params: {
    storyId: string;
  };
}) => {
  const res = await fetchClient(`/stories/${storyId}`);
  console.log(await res.json());
  if (!res.ok) {
  }
  return (
    <Grid
      columns={{ initial: "1", md: "2" }}
      gap={"4"}
      className="border-2 border-red-300"
    >
      {/* title
          slug
          posterImage
          seoKeywords
          tags 
      */}
    </Grid>
  );
};

export default StoryEditPage;
