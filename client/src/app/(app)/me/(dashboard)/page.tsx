import fetchClient from "@/lib/fetchClient";
import { TLooseStorySchema } from "@/shared-lib";

import dynamic from "next/dynamic";
const StoriesTable = dynamic(() => import("./StoriesTable"), {
  ssr: false,
});

const page = async () => {
  const res: any = await fetchClient("/stories/my");
  const stories: TLooseStorySchema[] = await res.json();
  console.log("stories: ", stories);
  return <StoriesTable stories={stories} />;
};

export default page;
