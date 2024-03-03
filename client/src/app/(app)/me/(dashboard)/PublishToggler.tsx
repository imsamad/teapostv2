"use client";
import fetchClient from "@/lib/fetchClient";
import { Switch } from "@radix-ui/themes";
import { useState } from "react";

const PublishToggler = ({ id, value }: { id: string; value: boolean }) => {
  const [isPublished, setIsPublished] = useState(value);
  const handleSubmit = async () => {
    let url = "/stories";

    url += !isPublished ? `/publish` : `/unpublish`;

    const res = await fetchClient(url, {
      method: "PUT",
      body: JSON.stringify({
        stories: [id],
      }),

      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      setIsPublished((p) => !p);
    }
  };

  return (
    <Switch size="3" checked={isPublished} onCheckedChange={handleSubmit} />
  );
};

export default PublishToggler;
