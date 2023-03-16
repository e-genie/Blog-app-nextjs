import CommentList from "@/components/comments/CommentList";
import { Category, Post, User } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiChevronsUp } from "react-icons/bi";

type TPostWithCatAndAuthor = Post & {
  category: Category;
  author: User;
};

const PostDetail = () => {
  const [post, setPost] = useState<TPostWithCatAndAuthor>();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const getOnePost = async () => {
      const { data } = await axios.get(`http://localhost:3000/api/posts/${id}`);
      setPost(data);
    };
    getOnePost();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Image
        src="/assets/article_default.png"
        alt="article default"
        width={500}
        height={10}
        className="h-52"
      />
      <div className="m-10">
        <div className="space-y-1">
          <h1 className="text-4xl font-semibold">{post.title}</h1>
          <p className="text-xl italic">{post.author.username}</p>
          <div className="flex justify-between">
            <p className="text-sm italic">
              {new Date(post.createdAt).toLocaleString("fr", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </p>
            <p className="text-sm italic">{post.category.name}</p>
          </div>
        </div>
        <hr className="w-full bg-black mt-4" />
        <div className="text-justify mt-4">{post.content}</div>
        <hr className="w-full bg-black my-6" />
        <div>Commentaires :</div>
        <CommentList />
      </div>
      <Link
        href="#top"
        onClick={() => (window.location.href = "#top")}
        className="fixed bottom-0 right-0 m-4"
      >
        <BiChevronsUp size={30} />
      </Link>
    </div>
  );
};

export default PostDetail;
