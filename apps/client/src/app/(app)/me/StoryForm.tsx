"use client";

import fetchClient from "@/lib/fetchClient";
import { Button } from "@radix-ui/themes";

const StoryForm = () => {
  const submitForm = async () => {
    try {
      const res = await fetchClient(`/auth/me`);

      const data = await res.json();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Button
        onClick={() => {
          submitForm();
        }}
      >
        fetch me
      </Button>
    </div>
  );
};

export default StoryForm;
