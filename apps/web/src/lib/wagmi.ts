import { createConfig, http } from "wagmi";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Decentralized Social Media",
  projectId: "d6e8552d2b86184a72064ea1f367606d",
  chains: [sepolia], // TODO: change to mainnet for production
  transports: {
    [sepolia.id]: http(),
  },
  ssr: true,
});
