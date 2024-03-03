"use client";

import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { GrChapterNext } from "react-icons/gr";
import fetchClient from "@/lib/fetchClient";
import ToastTP from "@/components/Toast";

const ProfileForm = ({ user }: any) => {
  const { register, handleSubmit, formState, setError } = useForm<any>({
    values: user,
  });
  const [status, setStatus] = useState<"success" | "error" | "">("");
  const onSubmit = async (data: any) => {
    console.log("data: ", data);
    const res = await fetchClient("/auth/update", {
      body: JSON.stringify({
        fullName: data.fullName,
        username: data.username,
      }),
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
    });

    setStatus(res.ok ? "success" : "error");
    if (!res.ok) {
      const error = await res.json();

      if (error?.errors?.username?.[0])
        setError("username", {
          message: error.errors.username[0],
        });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <Text>Full Name</Text> */}
        <MyInput
          type="text"
          label="Full Name *"
          register={register("fullName")}
          error={formState.errors.fullName?.message}
        />
        <MyInput
          type="text"
          label="Username *"
          register={register("username")}
          error={formState.errors.username?.message}
        />
        <Button
          variant="outline"
          className="w-full"
          size="2"
          my="2"
          disabled={!formState.isDirty}
          type="submit"
        >
          Submit
          <GrChapterNext />
        </Button>
        <Flex gap="2" my="4">
          <Button variant="soft" color="mint" size="1" className="flex-1">
            Edit Email
          </Button>
          <Button variant="soft" color="mint" size="1" className="flex-1">
            Change Password
          </Button>
        </Flex>
        <Button
          variant="classic"
          color="red"
          className="w-full"
          size="2"
          my="2"
        >
          Delete Account
        </Button>
      </form>
      <ToastTP
        open={!!status}
        toggle={() => setStatus("")}
        title={status == "success" ? "Changed successfully!" : "Try again!"}
      />
    </>
  );
};

export default ProfileForm;

const MyInput = ({ type, register, label, error }: any) => {
  return (
    <Box mb="4">
      <Text className="pl-2 text-gray-500">{label}</Text>
      <input
        type={type}
        className=" font-medium outline-none border-b-2 border-gray-800 rounded-md w-full p-0 pl-2 text-lg"
        {...register}
      />
      {error ? (
        <Text color="red" size="2" className="italic">
          {error}
        </Text>
      ) : null}
    </Box>
  );
};
