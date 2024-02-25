import React, { Suspense } from "react";
import AuthForm from "./AuthForm";
import { Box } from "@radix-ui/themes";
import { postLogin } from "../authAction";

const page = () => {
  return (
    <Suspense fallback="Loading">
      <Box className="flex justify-center pt-12">
        <AuthForm postLogin={postLogin} />
      </Box>
    </Suspense>
  );
};

export default page;
