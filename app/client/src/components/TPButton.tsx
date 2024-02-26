import React from "react";
import Spinner from "./Spinner";
import { Button } from "@radix-ui/themes";

const TPButton = ({
  disabled = false,
  isLoading = false,
  label,
}: {
  disabled?: boolean;
  isLoading?: boolean;
  label: string;
}) => {
  return (
    <Button
      className="border-2 border-gray-800 cursor-pointer"
      disabled={disabled}
    >
      {label} {` `}
      {isLoading ? <Spinner /> : ""}
    </Button>
  );
};

export default TPButton;
