"use client";
import { Button, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginToast({
  open,
  toggleOpen,
}: {
  open: boolean;
  toggleOpen: (x: boolean) => void;
}) {
  const notify = () => {
    toast(
      <Flex align="center">
        <Text className="flex-1">Login please!</Text>
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      </Flex>,
      {
        position: "top-right",
      }
    );
  };
  const timerRef = useRef<any>();

  useEffect(() => {
    if (open) notify();

    timerRef.current = setTimeout(() => {
      toggleOpen(false);
    }, 3000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [open]);

  return <ToastContainer />;
}

export default LoginToast;
