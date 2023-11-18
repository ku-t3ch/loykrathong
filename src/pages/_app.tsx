import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { ConfigProvider, theme } from "antd";
import { Toaster, resolveValue } from "react-hot-toast";
import { AlertCircleIcon, CheckIcon, Loader2Icon, XIcon } from "lucide-react";

const { defaultAlgorithm, darkAlgorithm } = theme;

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
    return (
        <>
            <Toaster>{
                (t) => <div className="rounded-lg bg-black/20 p-3 text-white backdrop-blur-md">
                    {t.type === "success" && <div className="flex gap-2">
                        <CheckIcon className="text-green-500" /> {resolveValue(t.message, t)}
                    </div>}
                    {t.type === "error" && <div className="flex gap-2">
                        <XIcon className="text-red-500" /> {resolveValue(t.message, t)}
                    </div>}
                    {t.type === "loading" && <div className="flex gap-2">
                        <Loader2Icon className="animate-spin" /> {resolveValue(t.message, t)}
                    </div>}
                </div>}
            </Toaster>
            <SessionProvider session={session}>
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
            </SessionProvider>
        </>
    );
};

export default api.withTRPC(MyApp);
