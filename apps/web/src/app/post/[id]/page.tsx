"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPostById, likePost, addComment } from "@/lib/api/post";

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await getPostById(id as string);
        setPost(data);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  const handleLike = async () => {
    const updated = await likePost(id as string);
    if (updated?.message === "Already liked") return;
    setPost(updated);
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setSubmitting(true);
    try {
      const newComment = await addComment(id as string, comment.trim());
      setPost((prev: any) => ({
        ...prev,
        comments: [...prev.comments, newComment],
      }));
      setComment("");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (!post) return <p className="p-4">Post not found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <p className="text-gray-600 text-sm mb-4">
        By {post.post.walletddress} on{" "}
        {new Date(post.post.timestamp).toLocaleString()}
      </p>
      <p className="mb-4">{post.post.content}</p>

      <div className="mb-4">
        <button
          onClick={handleLike}
          className="text-sm text-blue-600 hover:underline"
        >
          ❤️ Like ({post.likes || 0})
        </button>
      </div>

      <h2 className="text-lg font-medium mb-2">Comments</h2>
      <ul className="space-y-2 mb-4">
        {post.comments?.map((c: any) => (
          <li key={c.id} className="border p-2 rounded">
            <p className="text-sm">{c.content}</p>
            <p className="text-xs text-gray-500">
              by {c.author?.username ?? c.author?.walletAddress}
            </p>
          </li>
        ))}
      </ul>

      <form onSubmit={handleComment} className="space-y-2">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          className="w-full border rounded p-2"
          placeholder="Write a comment..."
        />
        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl disabled:opacity-50"
        >
          {submitting ? "Posting..." : "Post Comment"}
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
