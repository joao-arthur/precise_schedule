import type { ReactNode } from "react";
import { useEffect } from "react";
import { useWindowSize } from "usehooks-ts";
import { cl } from "@/lib/cl";
import { theme } from "@/features/theme/theme";
import { useSessionManager } from "@/features/session/useSessionManager";
import { Header } from "./header/Header";

type props = {
    readonly children: ReactNode;
};

export function Page({ children }: props) {
    const { height } = useWindowSize();
    const session = useSessionManager();

    useEffect(() => {
        theme.init();
        session.init();
    }, []);

    return (
        <div
            style={{ height }}
            className={cl(
                "flex flex-col overflow-auto dark:bg-dark-light",
                "transition-colors duration-500",
            )}
        >
            <Header />
            <main className="flex h-full">{children}</main>
        </div>
    );
}
