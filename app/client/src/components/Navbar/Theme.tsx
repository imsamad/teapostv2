"use client";
import { getCookieClientSide, setCookieClientSide } from "@/lib/utils";
import { IconButton } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

import { BsFillLightbulbOffFill as DarkICon } from "react-icons/bs";
import { BsFillLightbulbFill as LightIcon } from "react-icons/bs";

import React, { useEffect, useState } from "react";
const Theme = () => {
  const router = useRouter();
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    getCookieClientSide("teapost-theme");
  }, []);
  return (
    <IconButton
      variant="classic"
      onClick={() => {
        if (theme == "dark") {
          setCookieClientSide("teapost-theme", "light");
          setTheme("light");
        } else {
          setCookieClientSide("teapost-theme", "dark");
          setTheme("dark");
        }
        router.refresh();
      }}
    >
      {theme == "dark" ? <DarkICon /> : <LightIcon />}
    </IconButton>
  );
};

export default Theme;
