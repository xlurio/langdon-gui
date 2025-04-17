import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    remotePatterns: [
      new URL("http://localhost:8080/api/webdirectories/*/screenshot.png"),
    ],
  },
};

export default nextConfig;
