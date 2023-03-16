import { Category, Post, User } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

type TPostWithCatAndAuthor = Post & {
  category: Category;
  author: User;
};

export default function PostListAdmin() {
  const [post, setPost] = useState<TPostWithCatAndAuthor[]>([]);

  const getAllPost = async () => {
    const { data } = await axios.get("http://localhost:3000/api/posts");
    setPost(data);
  };

  useEffect(() => {
    getAllPost();
  }, []);

  const handleDelete = async (postId: string) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/api/posts/${postId}`
      );
      window.location.href = "/admin/home";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {post
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .map((post) => (
          <div key={post.id} className="flex items-center">
            <div className="flex items-center space-x-4">
              <Link href={`/admin/posts/edit/${post.id}`} key={post.id}>
                <FiEdit size={25} className="" />
              </Link>
              <Image
                src="/assets/article_default.png"
                alt="article default"
                width={100}
                height={20}
                className="my-2"
              />
            </div>
            <div className="flex flex-col pl-8">
              <div className="italic text-xs">{post.category.name}</div>
              <div className="font-semibold text-xl">{post.title}</div>
              <div className="font-semibold text-sm">
                {post.author.username}
              </div>
              <div className="italic text-xs">
                {new Date(post.createdAt).toLocaleString("fr", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </div>
            </div>
            <button
              type="button"
              className="flex items-center ml-10"
              onClick={() => handleDelete(post.id)}
            >
              <MdDelete size={25} color="red" />
            </button>
          </div>
        ))}
    </div>
  );
}
