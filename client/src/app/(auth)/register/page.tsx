import React from "react";
import AuthForm from "./AuthForm";
import { Box } from "@radix-ui/themes";
import { register } from "../authAction";

const RegisterPage = () => {
  return (
    <Box className="flex justify-center pt-12">
      <AuthForm register={register} />
    </Box>
  );
};

export default RegisterPage;
