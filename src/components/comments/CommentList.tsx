import { Comment, User } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";

type TCommentWithAuthor = Comment & {
  author: User;
};

export default function CommentList() {
  const [comment, setComment] = useState<TCommentWithAuthor[]>([]);

  const getAllComment = async () => {
    const { data } = await axios.get("http://localhost:3000/api/comments");
    setComment(data);
  };

  useEffect(() => {
    getAllComment();
  }, []);

  return (
    <div className="space-y-4 my-4">
      {comment
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .map((comment) => (
          <div key={comment.id} className="flex w-full px-4">
            <div className="flex flex-col w-full">
              <div className="flex justify-between">
                <div className="text-xs">{comment.author.username}</div>
                <div className="italic text-xs">
                  {new Date(comment.createdAt).toLocaleString("fr", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </div>
              </div>

              <div className="">{comment.content}</div>
            </div>
          </div>
        ))}
    </div>
  );
}
