/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  output: "standalone",
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  env: {
    cdn: "https://s3.tech.nisit.ku.ac.th/assets/loykrathong/2566",
    pocketbase: "http://pocketbase:8090",
    turnstileSiteKey: "0x4AAAAAAANcMRCzztWiMUsR",
  },
};

export default config;
