import type { ReactNode } from "react";
import classNames from "classnames";
import { useDevice } from "@/lib/device/useDevice";

type props = {
    readonly children: ReactNode;
};

export function PageContent({ children }: props) {
    const { isMobile } = useDevice();

    return (
        <div
            className={classNames(
                "flex flex-col my-0 mx-auto",
                isMobile() ? "w-4/5" : "w-100",
            )}
        >
            {children}
        </div>
    );
}
