"use client";

import fetchClient from "@/lib/fetchClient";
import { Box, Button, Heading, Text, TextField } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  HTMLInputTypeAttribute,
  Suspense,
  useState,
} from "react";

const AuthForm = ({ postLogin }: any) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [formState, setFormState] = useState({
    identifier: "imsamad00@gmail.com",
    password: "password",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetchClient("/auth/login", {
        method: "POST",
        body: JSON.stringify(formState),
        headers: {
          "content-type": "application/json",
        },
      });

      const data = await res.json();
      await postLogin(data);

      const redirectTo = searchParams.get("redirectTo");
      router.push(redirectTo || "/me");
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
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 "
      >
        <Input
          label="identifier"
          type="text"
          onChange={handleChange}
          name="identifier"
          value={formState.identifier}
        />
        <Input
          label="Password"
          type="password"
          onChange={handleChange}
          name="password"
          value={formState.password}
        />
        <Button className="border-2 border-gray-800 cursor-pointer">
          Submit
        </Button>
      </form>
      <Box className=" mx-auto cursor-pointer w-full text-center text-sm mt-2">
        New User?
        <Link className="text-blue-400 underline" href="/register">
          Register
        </Link>
      </Box>
    </Box>
  );
};

export default AuthForm;

const Input = ({
  label,
  placeholder,
  type,
  onChange,
  name,
  value,
}: {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  type: HTMLInputTypeAttribute;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <Box className="w-full">
      <Text size="2">{label}</Text>
      <TextField.Input
        placeholder={placeholder}
        size="1"
        type={type}
        onChange={onChange}
        name={name}
        value={value}
      />
    </Box>
  );
};
