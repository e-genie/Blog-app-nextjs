import axios from "axios";
import Image from "next/image";
import { useState } from "react";

export default function EditArticle() {
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
  const [editing, setEditing] = useState(false);
  const [postId, setPostId] = useState("");

  const handleEdit = async (id: string) => {
    setEditing(true);
    setPostId(id);
  };

  const handleUpdate = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/posts/${postId}`,
        {
          title: form.title,
          authorId: author,
          content: form.content,
          categoryId: form.categoryId,
        }
      );
      if (data.success) {
        setSuccess(data.message);
        setEditing(false);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(
        "An error occurred while updating the post. Please try again later."
      );
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
      {editing ? (
        <form onSubmit={handleUpdate}>
          ...
          <button
            type="submit"
            className="text-xl border border-black px-3 py-1"
          >
            Update your article
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          ...
          <button
            type="submit"
            className="text-xl border border-black px-3 py-1"
          >
            Create your article
          </button>
          <button
            type="button"
            onClick={() => handleEdit("id")}
            className="text-xl border border-black px-3 py-1 ml-6"
          >
            Edit your article
          </button>
        </form>
      )}
    </div>
  );
}
