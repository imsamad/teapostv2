"use client";

import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const Redirect = () => {
  const ref = useRef<number>();
  const router = useRouter();
  useEffect(() => {
    // @ts-ignore
    ref.current = setTimeout(() => {
      router.replace("/me");
    }, 3000);
    return () => {
      clearInterval(ref.current);
    };
    // react-hooks/exhautive-deps
  }, []);
  return (
    <div>
      Redirecting... <Spinner w={20} h={20} />
    </div>
  );
};

export const revalidate = 0;

export default Redirect;
