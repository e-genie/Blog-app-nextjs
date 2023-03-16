import { useAuth } from "@/context/UserContext";
import Link from "next/link";
import React, { useState } from "react";

type Props = {};

export default function LogIn({}: Props) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { signIn } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="space-y-4">
      <div className="text-xl">Log in</div>
      <hr className="w-full bg-black" />
      <form className="text-xl text-black space-y-4">
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className=""
          placeholder="my email"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className=""
          placeholder="my password"
        />
      </form>
      <div className="flex justify-end">
        <Link href="/">
          <button
            type="button"
            onClick={() => signIn(form)}
            className="text-xl border border-black px-3 py-1"
          >
            Log in
          </button>
        </Link>
      </div>
    </div>
  );
}
