"use client";

import { useAccount, useSignMessage } from "wagmi";
import { useState } from "react";
import api from "@/lib/api";

export const useAuth = () => {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [token, setToken] = useState<string | null>(null);

  const login = async () => {
    if (!isConnected || !address) {
      console.error("Wallet not connected");
      return;
    }

    const message = `Sign in to DecentraSocial`;

    try {
      const signature = await signMessageAsync({ message });

      const { data } = await api.post("/auth/verify", {
        address,
        message,
        signature,
      });

      if (data.success && data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        console.log("✅ Authenticated");
      } else {
        console.error("❌ Invalid signature or failed login");
      }
    } catch (err) {
      console.error("Signing error", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return {
    address,
    isConnected,
    token,
    login,
    logout,
    isSignedIn: !!localStorage.getItem("token"),
  };
};
