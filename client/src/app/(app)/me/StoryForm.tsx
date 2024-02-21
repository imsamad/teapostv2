"use client";

import { Button } from "@radix-ui/themes";

const StoryForm = () => {
  const submitForm = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        credentials: "include",
        mode: "cors",
      });

      const data = await res.json();

      console.log(data);

      const res1 = await fetch(`/api/getMe`);

      const data1 = await res1.json();

      console.log(data1);
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
