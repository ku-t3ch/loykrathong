import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { ConfigProvider, theme } from "antd";

const { defaultAlgorithm, darkAlgorithm } = theme;

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    // <SessionProvider session={session}>
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#00b96b",
        },
        algorithm: darkAlgorithm,
      }}
    >
      <Component {...pageProps} />
    </ConfigProvider>
    // </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
