"use client";
import fetchClient from "@/lib/fetchClient";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { useState } from "react";
import Spinner from "../Spinner";
import ToastTP from "../Toast";
import { useRouter } from "next/navigation";

const Write = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const handleClick = async () => {
    setIsLoading(true);
    try {
      const res = await fetchClient("/stories", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          slug: Math.random().toString().slice(2),
        }),
      });

      if (res.ok) {
        const story = await res.json();
        console.log("story", story);
        router.push(`/me/stories/edit/${story.id}`);
      } else {
        throw Error("");
      }
    } catch (err) {
      setToast(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Button onClick={handleClick}>
        Create + {isLoading ? <Spinner /> : null}
      </Button>
      <ToastTP
        open={toast}
        toggle={(p) => setToast(p)}
        title="Something went wrong, plase try again."
      />
    </>
  );
};

export default Write;
