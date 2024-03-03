"use client";
import { deleteProfileLocalStorage } from "@/lib/profileLocalStorageClient";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const LogoutBtn = ({ logout }: any) => {
  const router = useRouter();

  return (
    <Button
      onClick={async () => {
        const data = await logout();
        deleteProfileLocalStorage();
        console.log("data: ", data);
        router.refresh();
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutBtn;
