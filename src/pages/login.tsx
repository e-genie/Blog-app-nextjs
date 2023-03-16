import LogIn from "@/components/login/LogIn";
import Link from "next/link";
import React from "react";

export default function Login() {
  return (
    <div className="w-4/5 mx-auto my-16">
      <LogIn />
      <div className="flex flex-col items-center my-16 space-y-2">
        <div className="text-xl">Don&apos;t have an account?</div>
        <Link href="/signup">Click here</Link>
      </div>
    </div>
  );
}
