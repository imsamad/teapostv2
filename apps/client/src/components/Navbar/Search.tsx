"use client";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";
import React from "react";

const Search = () => {
  return (
    <TextField.Root
      className="flex-1  outline-none border-0 "
      variant="soft"
      radius="large"
    >
      <TextField.Slot>
        <MagnifyingGlassIcon height="16" width="16" />
      </TextField.Slot>
      <TextField.Input
        placeholder="Search the docs…"
        className="border-0 outline-none"
      />
    </TextField.Root>
  );
};

export default Search;
