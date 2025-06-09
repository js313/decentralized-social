import { createConfig, http } from "wagmi";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Decentralized Social Media",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
  chains: [sepolia], // TODO: change to mainnet for production
  transports: {
    [sepolia.id]: http(),
  },
  ssr: true,
});
