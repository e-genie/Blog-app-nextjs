import { useAuth } from "@/context/UserContext";
import Link from "next/link";
import React, { useState } from "react";

type Props = {};

export default function AdminLogIn({}: Props) {
  const [adminForm, setAdminForm] = useState({
    email: "",
    password: "",
  });
  const { signIn } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminForm((adminForm) => ({
      ...adminForm,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="space-y-4">
      <div className="text-xl">Admin / Log in</div>
      <hr className="w-full bg-black" />
      <form className="text-xl text-black space-y-4">
        <input
          type="email"
          name="email"
          value={adminForm.email}
          onChange={handleChange}
          placeholder="my email"
        />
        <input
          type="password"
          name="password"
          value={adminForm.password}
          onChange={handleChange}
          placeholder="my password"
        />
      </form>
      <div className="flex justify-end">
        <Link href="/admin/home">
          <button
            type="button"
            onClick={() => signIn(adminForm)}
            className="text-xl border border-black px-3 py-1"
          >
            Log in
          </button>
        </Link>
      </div>
    </div>
  );
}
