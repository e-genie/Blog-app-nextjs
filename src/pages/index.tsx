import PostList from "@/components/posts/PostList";
import React from "react";
import { BiChevronDown } from "react-icons/bi";

type Props = {};

export default function Home({}: Props) {
  return (
    <div>
      <div className="pl-10 pt-10 flex">
        <div className="font-semibold italic pr-2">Lastest posts</div>
        <BiChevronDown size={25} />
      </div>
      <div className="flex my-4 ml-16">
        <PostList />
      </div>
    </div>
  );
}
