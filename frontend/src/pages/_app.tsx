import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Toaster } from "react-hot-toast";
import { Page } from "@/content/base/Page";
import "../styles/globals.css";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <div id="modal" className="z-20 absolute" />
            <Toaster />
            {/*<ReactQueryDevtools initialIsOpen={false} />*/}
            <Page>
                <Component {...pageProps} />
            </Page>
        </QueryClientProvider>
    );
}
