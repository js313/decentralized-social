"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "@/lib/api/post";

export default function CreatePostPage() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const post = await createPost({ content });
      router.push(`/post/${post.id}`);
    } catch (err: any) {
      setError("Failed to create post. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Create a New Post</h1>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          rows={6}
          placeholder="Post Content"
          className="w-full border p-2 rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={submitting}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-xl disabled:opacity-50"
          disabled={submitting}
        >
          {submitting ? "Posting..." : "Post"}
        </button>
      </form>
      <div className="py-2 flex flex-row justify-between">
        <button
          type="button"
          className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600"
          onClick={() => router.push("/")}
        >
          Home
        </button>
      </div>
    </div>
  );
}
