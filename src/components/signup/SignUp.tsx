import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

type Props = {};

export default function SignUp({}: Props) {
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/signup",
        {
          email: form.email,
          username: form.username,
          password: form.password,
        }
      );

      if (data.success) {
        setSuccess(data.message);
        setForm({ email: "", username: "", password: "" });
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("An error occurred while signing up. Please try again later.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-xl">Sign up</div>
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
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          className=""
          placeholder="my username"
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
            onClick={handleSubmit}
            className="text-xl border border-black px-3 py-1"
          >
            Sign up
          </button>
        </Link>
      </div>
    </div>
  );
}
