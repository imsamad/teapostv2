import fetchClient from "@/lib/fetchClient";
import { Box, Flex, Heading } from "@radix-ui/themes";
import React from "react";
import ProfileForm from "./ProfileForm";

const ProfilePage = async () => {
  const res = await fetchClient("/auth/me");

  const data: any = await res.json();

  console.log(data);

  return (
    <Flex justify="center">
      <Box className="w-full md:w-1/2 mt-10 ">
        <Heading align="center">My Profile</Heading>
        <ProfileForm user={data} />
      </Box>
    </Flex>
  );
};

export default ProfilePage;
