import { Button } from "@radix-ui/themes";
import Link from "next/link";

const page = async () => {
  return (
    <div className="">
      <Link href={`/me/stories/create/${Math.random().toString().slice(2)}`}>
        <Button>Create +</Button>
      </Link>
    </div>
  );
};

export default page;
