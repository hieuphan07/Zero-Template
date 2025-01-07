/** @type {import('next').NextConfig} */
import path from "path";
import { fileURLToPath } from "url";
import i18nConfig from "./next-i18next.config.js";

// Get the filename and directory name from the URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  i18n: i18nConfig.i18n,
  output: "standalone",
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  reactStrictMode: false,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  webpack(config: any, { isServer }: any) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    config.resolve.fallback = {
      fs: false,
    };
    return config;
  },
};

export default nextConfig;
