"use client";

import TPButton from "@/components/TPButton";
import TPInput from "@/components/TPInput";
import fetchClient from "@/lib/fetchClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";
import { LoginSchema, TLoginSchema } from "shared";

const AuthForm = ({ postLogin }: any) => {
  const searchParams = useSearchParams();

  const router = useRouter();
  const {
    register,
    formState: { isValid, isSubmitting, errors },
    handleSubmit,
    setError,
  } = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
    mode: "all",
    values: {
      identifier: "imsamad00@gmail.com",
      password: "password",
    },
  });

  const onSubmit = async (data: TLoginSchema) => {
    try {
      const res = await fetchClient("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
      });

      const resData = await res.json();

      if (res.ok) {
        await postLogin(resData);

        const redirectTo = searchParams.get("redirectTo");
        router.push(redirectTo || "/me");
        return;
      }

      const identifierError = resData?.errors?.identifier;
      const passwordError = resData?.errors?.password;
      if (identifierError)
        setError("identifier", {
          message: identifierError,
        });

      if (passwordError)
        setError("password", {
          message: passwordError,
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box className="border-2 border-gray-200 rounded-md shadow-md p-6 w-[300px]">
      <Heading align="center" className="mb-4">
        Login
      </Heading>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-4 "
      >
        <TPInput
          label="identifier"
          type="text"
          register={register("identifier")}
          error={errors.identifier?.message}
        />
        <TPInput
          label="Password"
          type="password"
          register={register("password")}
          error={errors.password?.message}
        />
        <TPButton disabled={!isValid} isLoading={isSubmitting} label="Submit" />
      </form>
      <Box className=" mx-auto cursor-pointer w-full text-center text-sm mt-2">
        New User? {` `}
        <Link className="text-blue-400 underline" href="/register">
          Register
        </Link>
      </Box>
    </Box>
  );
};

export default AuthForm;
