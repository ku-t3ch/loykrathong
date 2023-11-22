import { NextPage } from "next";
import { Html, Head, NextScript, Main } from "next/document";

interface Props { }

const _document: NextPage<Props> = () => {
    return (
        <Html>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

export default _document;