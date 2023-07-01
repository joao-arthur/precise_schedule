import type { ReactNode } from "react";
import clss from "classnames";

type props = {
    readonly children: ReactNode;
};

export function TextSmall({ children }: props) {
    return (
        <span
            className={clss(
                "select-none text-xs dark:text-pastel-gray",
                "transition-colors duration-500",
            )}
        >
            {children}
        </span>
    );
}
