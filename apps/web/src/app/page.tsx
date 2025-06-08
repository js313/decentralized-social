"use client";

import Feed from "@/components/Feed";
import LoginButton from "@/components/LoginButton";
import { WalletButton } from "@/components/WalletButton";

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
    </main>
  );
}
