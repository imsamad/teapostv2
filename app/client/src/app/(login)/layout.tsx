import GenericLayout from "@/components/GenericLayout";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return <GenericLayout showRightBtns={false}>{children}</GenericLayout>;
};

export default AuthLayout;
