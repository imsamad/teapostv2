"use client";

import { InfoCircledIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Callout,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
import Link from "next/link";

import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  HTMLInputTypeAttribute,
  useState,
} from "react";

const AuthForm = ({ register }: any) => {
  const [formState, setFormState] = useState({
    fullName: "Abdus Samad",
    email: "imsamad00@gmail.com",
    password: "password",
    confirmPassword: "password",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) setError(false);
    if (response.message || response.redirectUrl) {
      setResponse({ message: "" });
    }
    setFormState((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const [response, setResponse] = useState<{
    redirectUrl?: string;
    message: string;
  }>({
    message: "",
  });
  const [error, setError] = useState(false);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const data = await register(formState);

      if (data.error) {
        setError(true);
        return;
      }

      setResponse(data.data);
      setFormState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
    } finally {
    }
  };
  return (
    <Box className="border-2 border-gray-200 rounded-md shadow-md p-6 w-[300px]">
      <Heading align="center" className="mb-4">
        Register
      </Heading>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 "
      >
        <Input
          label="Full Name"
          type="text"
          onChange={handleChange}
          name="fullName"
          value={formState.fullName}
          error={error}
        />
        <Input
          label="Email"
          type="text"
          onChange={handleChange}
          name="email"
          value={formState.email}
          error={error}
        />
        <Input
          label="Password"
          type="password"
          onChange={handleChange}
          name="password"
          value={formState.password}
          error={error}
        />
        <Input
          label="Confirm Password"
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          value={formState.confirmPassword}
          error={error}
        />
        <Button className="border-2 border-gray-800 cursor-pointer">
          Submit
        </Button>
      </form>

      {response?.message ? (
        <Info
          message={response.message}
          redirectUrl={response.redirectUrl}
          error={error}
        />
      ) : null}
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
  error: any;
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

const Info = ({
  redirectUrl,
  message,
  error,
}: {
  redirectUrl?: string;
  message: string;
  error: boolean;
}) => {
  return (
    <Callout.Root size="1" className="my-2" color={error ? "red" : "blue"}>
      <Callout.Icon>
        <InfoCircledIcon />
      </Callout.Icon>
      <Callout.Text>
        {error ? (
          "Provide correct details!"
        ) : redirectUrl ? (
          <Link href={redirectUrl}>Verify it</Link>
        ) : (
          message
        )}
      </Callout.Text>
    </Callout.Root>
  );
};
