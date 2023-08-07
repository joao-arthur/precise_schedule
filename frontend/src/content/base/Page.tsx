import type { ReactNode } from "react";
import { useEffect } from "react";
import { useWindowSize } from "usehooks-ts";
import { cl } from "@/lib/cl";
import { theme } from "@/features/theme/theme";
import { useSessionManager } from "@/features/session/useSessionManager";

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
                "flex flex-col overflow-auto bg-gray-100 dark:bg-drk-dk2",
                "transition-colors duration-100",
            )}
        >
            {children}
        </div>
    );
}
