import type { ReactNode } from "react";
import { useEffect } from "react";
import { cl } from "@/lib/cl";
import { theme } from "@/features/theme/theme";

type props = {
    readonly children: ReactNode;
};

export function Page({ children }: props) {
    useEffect(() => {
        theme.init();
    }, []);

    return (
        <div
            className={cl(
                "h-screen",
                "flex flex-col overflow-auto bg-gray-100 dark:bg-drk-dk2",
                "transition-colors duration-100",
            )}
        >
            {children}
        </div>
    );
}
