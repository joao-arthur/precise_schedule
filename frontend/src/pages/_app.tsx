import type { AppProps } from "next/app";
import { Page } from "@/content/base/Page";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <div id="modal" className="z-20 absolute" />
            <Page>
                <Component {...pageProps} />
            </Page>
        </>
    );
}
