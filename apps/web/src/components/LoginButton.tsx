"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function LoginButton() {
  const router = useRouter();
  const { login, token, isConnected, isSignedIn } = useAuth();

  if (!isConnected) return <></>;

  return (
    <div>
      {token || isSignedIn ? (
        <button
          onClick={() => router.push("/profile")}
          className="px-4 py-2 bg-green-500 text-white rounded-xl font-bold cursor-pointer"
        >
          Profile
        </button>
      ) : (
        <button
          onClick={login}
          className="px-4 py-2 bg-blue-500 text-white rounded-xl font-bold cursor-pointer"
          disabled={!isConnected}
        >
          Sign In with Wallet
        </button>
      )}
    </div>
  );
}
