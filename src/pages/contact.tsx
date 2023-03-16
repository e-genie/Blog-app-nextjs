import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col items-center mt-16 space-y-8">
      <div className="text-xl">Contact</div>
      <form className="flex flex-col text-xl text-black space-y-4">
        <input
          type="email"
          name="email"
          placeholder="your email"
          onChange={handleChange}
        />
        <input
          type="text"
          name="message"
          placeholder="tell us something..."
          onChange={handleChange}
        />
      </form>
      <button
        type="submit"
        className="text-xl border border-black px-3 py-1"
        onClick={() => setForm(form)}
      >
        Submit
      </button>
    </div>
  );
}
