import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
    ...(process.env.NODE_ENV === "development" && {
      turbo: {
        rules: {
          "**/*.{tsx,jsx}": {
            loaders: [
              {
                loader: "@locator/webpack-loader",
                options: { env: "development" },
              },
            ],
          },
        },
      },
    }),
  },
};

export default nextConfig;
