import { Category } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {};

export default function CreatePost({}: Props) {
  const [form, setForm] = useState({
    title: "",
    authorId: "",
    content: "",
    categoryId: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(null);
  const [category, setCategory] = useState<Category[]>([]);
  const [author, setAuthor] = useState("cf8425f9-7283-4356-af99-6fa3b7d5c238");

  const getAllCategories = async () => {
    const { data } = await axios.get("http://localhost:3000/api/categories");
    setCategory(data);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post("http://localhost:3000/api/posts", {
        title: form.title,
        authorId: author,
        content: form.content,
        categoryId: form.categoryId,
      });
      if (data.success) {
        setSuccess(data.message);
        setForm({
          title: form.title,
          authorId: author,
          content: form.content,
          categoryId: form.categoryId,
        });
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("An error occurred while signing up. Please try again later.");
    }
  };

  return (
    <div>
      <Image
        src="/assets/article_default.png"
        alt="article default"
        width={500}
        height={100}
        className="h-52"
      />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="text-4xl font-semibold"
          placeholder="Add a title"
        />
        {/* <input
          type="text"
          name="authorId"
          value={form.authorId}
          onChange={handleChange}
          className="text-xl italic"
          placeholder="Your username"
        /> */}
        <div className="flex justify-between">
          <select
            name="categoryId"
            className="text-sm italic"
            onChange={(e) => {
              setForm((form) => ({
                ...form,
                categoryId: e.target.value,
              }));
            }}
          >
            <option value="categoryId">Choose your category</option>
            {category.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <hr className="w-full bg-black mt-4" />
        <input
          type="text"
          name="content"
          value={form.content}
          onChange={handleChange}
          className="text-justify mt-4"
          placeholder="Add your content..."
        />
        <hr className="w-full bg-black my-6" />
        <button type="submit" className="text-xl border border-black px-3 py-1">
          Create your article
        </button>
      </form>
    </div>
  );
}
