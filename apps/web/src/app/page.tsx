"use client";

import Feed from "@/components/Feed";
import LoginButton from "@/components/LoginButton";
import { WalletButton } from "@/components/WalletButton";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-4">
      <nav className="sticky top-0 w-full mb-4">
        <div className="flex flex-row justify-between">
          <WalletButton />
          <LoginButton />
        </div>
      </nav>
      <h1 className="text-xl mt-4">Decentralized Social Media</h1>
      <Feed />
      <div className="py-2 mb-5 sticky bottom-0 bg-opacity-90 w-full">
        <div className="w-full flex justify-end">
          <Link
            href={"/create-post"}
            className="right-10 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-green-600"
          >
            + Post
          </Link>
        </div>
      </div>
    </main>
  );
}
