import GenericLayout from "@/components/GenericLayout";
import { isLoggedIn } from "./authAction";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  if (await isLoggedIn()) return redirect("/me");
  return <GenericLayout showRightBtns={false}>{children}</GenericLayout>;
};

export default AuthLayout;
