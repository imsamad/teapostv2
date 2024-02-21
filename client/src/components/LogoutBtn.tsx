"use client";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const LogoutBtn = ({ logout }: any) => {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        logout();
        router.refresh();
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutBtn;
