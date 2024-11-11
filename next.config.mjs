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
    pocketbase: process.env.NEXT_PUBLIC_POCKETBASE_URL || '',
    turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '',
  },
};

export default config;
