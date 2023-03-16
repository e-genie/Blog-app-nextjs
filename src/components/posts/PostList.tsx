import { Category, Post, User } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type TPostWithCatAndAuthor = Post & {
  category: Category;
  author: User;
};

export default function PostList() {
  const [post, setPost] = useState<TPostWithCatAndAuthor[]>([]);

  const getAllPost = async () => {
    const { data } = await axios.get("http://localhost:3000/api/posts");
    setPost(data);
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <div>
      {post
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .map((post) => (
          <Link href={`/posts/${post.id}`} key={post.id}>
            <div key={post.id} className="flex space-y-4">
              <Image
                src="/assets/article_default.png"
                alt="article default"
                width={100}
                height={20}
                className="my-2"
              />
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
            </div>
          </Link>
        ))}
    </div>
  );
}
