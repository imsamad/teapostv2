import React, { useState } from "react";
import { Box, Button, Flex } from "@radix-ui/themes";
import { TStorySchema, TTagSchema } from "@/shared-lib";

const TagSelector = ({
  tags,
  selectedTags,
  handleChange,
}: {
  tags: TTagSchema[];
  selectedTags?: TStorySchema["tags"];
  handleChange(id: string, checked: boolean): void;
}) => {
  return (
    <Box className="flex gap-2 flex-wrap justify-center">
      {tags.map((tag) => {
        const checked = !!selectedTags?.includes(tag.id);
        return (
          <Button
            size="1"
            variant={checked ? "classic" : "surface"}
            color="blue"
            key={tag.id}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleChange(tag.id, checked);
            }}
          >
            {tag.title}
          </Button>
        );
      })}
    </Box>
  );
};

export default TagSelector;
