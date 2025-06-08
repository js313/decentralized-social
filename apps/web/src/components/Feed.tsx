"use client";

import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import api from "@/lib/api";

interface Post {
  id: number;
  content: string;
  wallet_address: string;
  timestamp: string;
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    api.get("/posts").then((res) => setPosts(res.data));
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-8">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          content={post.content}
          walletAddress={post.wallet_address}
          createdAt={post.timestamp}
        />
      ))}
    </div>
  );
}
