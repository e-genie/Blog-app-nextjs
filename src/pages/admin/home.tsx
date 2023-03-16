import React from "react";
import { BiChevronDown } from "react-icons/bi";
import { SlPlus } from "react-icons/sl";
import Link from "next/link";
import PostListAdmin from "@/components/posts/PostListAdmin";

type Props = {};

export default function HomeAdmin({}: Props) {
  return (
    <div>
      <div className="pl-10 pt-10 flex">
        <div className="font-semibold italic pr-2">Lastest posts</div>
        <BiChevronDown size={25} />
      </div>
      <div className="flex flex-col my-4 ml-12">
        <Link href="/admin/posts/create" className="flex my-4">
          <SlPlus size={25} />
          <div className="pl-4">Add an article</div>
        </Link>
        <PostListAdmin />
      </div>
    </div>
  );
}
