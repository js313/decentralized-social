"use client";

import React from "react";

interface PostCardProps {
  id: number;
  content: string;
  walletAddress: string;
  createdAt: string;
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  content,
  walletAddress,
  createdAt,
}) => {
  return (
    <div className="border border-gray-300 rounded-xl p-4 mb-4 shadow-sm bg-gray-700">
      <div className="text-sm text-gray-500">
        {walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4)}
      </div>
      <div className="text-lg my-2">{content}</div>
      <div className="flex justify-between text-sm text-gray-400">
        <span>{new Date(createdAt).toLocaleString()}</span>
        <a href={`/post/${id}`} className="text-blue-500 hover:underline">
          View Details
        </a>
      </div>
    </div>
  );
};

export default PostCard;
