import GenericLayout from "@/components/GenericLayout";

const NonAuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <GenericLayout showRightBtns={true}>{children}</GenericLayout>;
};

export default NonAuthLayout;
