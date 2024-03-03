"use client";

import { TLooseStorySchema, LooseStorySchema, TTagSchema } from "@/shared-lib";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, Kbd, Text } from "@radix-ui/themes";
import TPInput from "@/components/TPInput";
import TagSelector from "./TagSelector";

import Editor from "./Editor";
import PosterImage from "./PosterImage";
import { useState } from "react";
import fetchClient from "@/lib/fetchClient";
import ToastTP from "@/components/Toast";

const EditStoryForm = ({
  story,
  tags,
}: {
  story: TLooseStorySchema;
  tags: TTagSchema[];
}) => {
  const { tags: omitTags, ...rest } = story;
  const { register, formState, control, handleSubmit } = useForm({
    resolver: zodResolver(LooseStorySchema(true)),
    values: rest,
  });

  const [selectedTags, setSelectedTags] = useState(story.tags);

  const handleTagChange = (newTag: string, checked: boolean) => {
    setSelectedTags(
      !selectedTags?.length
        ? [newTag]
        : (pre: any) =>
            checked ? pre?.filter((x: string) => x != newTag) : [...pre, newTag]
    );
  };

  const onSubmit = async (data: TLooseStorySchema) => {
    const body = { ...data, tags: selectedTags };

    const res = await fetchClient(`/stories/${story.id}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      setStatus("error");
    } else setStatus("success");
    console.log(await res.json());
  };
  const [status, setStatus] = useState<"success" | "error" | "">("");
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.ctrlKey && e.key == "s") {
          e.stopPropagation();
          e.preventDefault();
          handleSubmit(onSubmit)(e);
        }
      }}
    >
      <Grid
        columns={{ initial: "1", md: "2" }}
        gap={"4"}
        className="border-0 border-green-500"
      >
        <PosterImage />

        <TPInput
          register={register("title")}
          label="Title"
          type="text"
          error={formState.errors.title?.message}
        />
        <TPInput
          register={register("slug")}
          label="slug /"
          type="text"
          error={formState.errors.slug?.message}
        />

        <TPInput
          register={register("seoKeywords")}
          label="SEO Keywords"
          type="text"
          error={formState.errors.seoKeywords?.message}
        />
        <Box className="col-span-2 border-0 border-red-300  flex flex-col items-center">
          <Text mb="2" mx="auto" size="4" align="center">
            Select tags
          </Text>

          <TagSelector
            tags={tags}
            selectedTags={selectedTags}
            handleChange={handleTagChange}
          />
        </Box>
        <Box className="col-span-2 border-0 border-red-300  flex flex-col items-center">
          <Controller
            name="description"
            control={control}
            render={({ field }) => <Editor field={field} />}
          />
        </Box>
        <Box className="fixed right-4 bottom-4 ">
          <Button
            variant="solid"
            type="submit"
            color="blue"
            className="bg-blue-400"
            // disabled={
            //   !formState.isDirty || selectedTags?.length == story.tags?.length
            // }
          >
            Save / <Kbd>ctrl + s</Kbd>
          </Button>
        </Box>
      </Grid>
      <ToastTP
        open={!!status}
        title={
          status == "success"
            ? "Save successfully!"
            : "Error, please try again!"
        }
        toggle={() => {
          setStatus("");
        }}
      />
    </form>
  );
};

export default EditStoryForm;
