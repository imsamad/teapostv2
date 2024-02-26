"use client";

import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Box, Callout, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { UserRegisterSchema, TUserRegisterSchema } from "shared";
import fetchClient from "@/lib/fetchClient";

import ToastTP from "@/components/Toast";
import TPInput from "@/components/TPInput";
import TPButton from "@/components/TPButton";

const AuthForm = ({ register }: any) => {
  const {
    register: formFieldRegister,
    handleSubmit,
    formState,
    setError,
    reset,
  } = useForm<TUserRegisterSchema>({
    resolver: zodResolver(UserRegisterSchema),
    values: {
      email: "imsamad00@gmail.com",
      password: "password",
      confirmPassword: "password",
      fullName: "Abdus Samad",
    },
    mode: "onBlur",
  });
  const { isSubmitting, isValid } = formState;
  const [response, setResponse] = useState<{
    message?: string;
    redirectUrl?: string;
    error?: string;
  }>({
    message: "",
  });
  const [openToast, setOpenToast] = useState(false);
  const onSubmit = async (data: TUserRegisterSchema) => {
    try {
      const res = await fetchClient("/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await res.json();

      if (res.ok) {
        setResponse(resData);
        setOpenToast(true);
        reset();
      } else {
        const errorData = resData?.errors[0];

        const firstErrorField = Object.keys(errorData)[0];

        setError(
          // @ts-ignore
          firstErrorField,
          {
            message: errorData[firstErrorField]?.[0],
          },
          {
            shouldFocus: true,
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className="border-2 border-gray-200 rounded-md shadow-md p-6 w-[300px]">
      <Heading align="center" className="mb-4">
        Register
      </Heading>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-4 "
      >
        <TPInput
          label="Full Name"
          type="text"
          register={formFieldRegister("fullName")}
          error={formState.errors.fullName?.message}
        />

        <TPInput
          label="Email"
          type="text"
          register={formFieldRegister("email")}
          error={formState.errors.email?.message}
        />
        <TPInput
          label="Password"
          type="password"
          register={formFieldRegister("password")}
          error={formState.errors.password?.message}
        />
        <TPInput
          label="Confirm Password"
          type="password"
          register={formFieldRegister("confirmPassword")}
          error={formState.errors.confirmPassword?.message}
        />
        {response.redirectUrl ? (
          <Redirect
            redirectUrl={response.redirectUrl}
            message={response.message}
          />
        ) : null}
        <TPButton disabled={!isValid} isLoading={isSubmitting} label="Submit" />
      </form>

      <Box className=" mx-auto cursor-pointer w-full text-center text-sm mt-2">
        Already member?
        <Link className="text-blue-400 underline" href="/login">
          Login
        </Link>
      </Box>
      <ToastTP
        open={openToast}
        toggle={(p) => setOpenToast(p)}
        title="Signup successfully!"
        subtitle="Confirmation email sent!"
      />
    </Box>
  );
};

export default AuthForm;

const Redirect = ({
  redirectUrl,
  message,
}: {
  redirectUrl?: string;
  message?: string;
}) => {
  return (
    <Callout.Root size="1" className="my-2" color={"blue"}>
      <Callout.Icon>
        <InfoCircledIcon />
      </Callout.Icon>
      <Callout.Text>
        {redirectUrl ? (
          <Link href={redirectUrl} target="_blank">
            Verify your email
          </Link>
        ) : (
          message
        )}
      </Callout.Text>
    </Callout.Root>
  );
};
