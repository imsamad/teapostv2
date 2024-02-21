import React from "react";
import AuthForm from "./AuthForm";
import { Box } from "@radix-ui/themes";
import { login } from "../authAction";

const page = () => {
  return (
    <Box className="flex justify-center pt-12">
      <AuthForm login={login} />
    </Box>
  );
};

export default page;
