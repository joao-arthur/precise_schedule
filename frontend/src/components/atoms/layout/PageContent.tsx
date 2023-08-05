import type { ReactNode } from "react";
import cl from "classnames";
import { useDevice } from "@/lib/device/useDevice";

type props = {
    readonly children: ReactNode;
};

export function PageContent({ children }: props) {
    const isMobile = useDevice().isMobile();

    return (
        <div
            className={cl(
                "flex flex-col my-0 mx-auto pt-5",
                isMobile ? "w-4/5" : "w-100",
            )}
        >
            {children}
        </div>
    );
}
