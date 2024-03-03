import { TStorySchema } from "@/shared-lib";
import { Button } from "@radix-ui/themes";
import { useState } from "react";

import { BiCommentAdd } from "react-icons/bi";

const StoryComment = ({ story }: { story: TStorySchema }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Button size="1" variant="ghost">
        <BiCommentAdd /> 65
      </Button>
    </>
  );
};

export default StoryComment;
