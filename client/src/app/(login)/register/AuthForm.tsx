"use client";

import { Box, Button, Heading, Text, TextField } from "@radix-ui/themes";
import Link from "next/link";

import {
  ChangeEvent,
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  useState,
} from "react";

const AuthForm = ({ register, login }: any) => {
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  return (
    <Box className="border-2 border-gray-200 rounded-md shadow-md p-6 w-[300px]">
      <Heading align="center" className="mb-4">
        Register
      </Heading>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          try {
            const data = await register(formState);
          } catch (err) {
            console.log(err);
          }
        }}
        className="flex flex-col items-center gap-4 "
      >
        <Input
          label="Full Name"
          type="text"
          onChange={handleChange}
          name="fullName"
          value={formState.fullName}
        />
        <Input
          label="Email"
          type="text"
          onChange={handleChange}
          name="email"
          value={formState.email}
        />
        <Input
          label="Password"
          type="password"
          onChange={handleChange}
          name="password"
          value={formState.password}
        />{" "}
        <Input
          label="Confirm Password"
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          value={formState.fullName}
        />
        <Button className="border-2 border-gray-800 cursor-pointer">
          Submit
        </Button>
      </form>
      <Box className=" mx-auto cursor-pointer w-full text-center text-sm mt-2">
        Already member?
        <Link className="text-blue-400 underline" href="/login">
          Login
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
