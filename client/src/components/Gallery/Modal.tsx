"use client";
import {
  Button,
  Dialog,
  Flex,
  Heading,
  IconButton,
  Text,
} from "@radix-ui/themes";
import React, { useState } from "react";
import Gallery from ".";
import { IoMdClose } from "react-icons/io";

const Modal = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger>
        <Button
          variant="outline"
          color="blue"
          onClick={() => setOpen((p) => !p)}
        >
          Edit profile
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Flex align="center" justify="between">
          <Heading>Edit profile</Heading>
          <IconButton variant="soft" onClick={() => setOpen((p) => !p)}>
            <IoMdClose />
          </IconButton>
        </Flex>
        <Dialog.Description size="2" mb="4">
          Make changes to your profile.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <Gallery />
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Modal;
