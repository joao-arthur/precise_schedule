import type { ReactNode } from "react";
import clss from "classnames";

type props = {
    readonly children: ReactNode;
};

export function TextMedium({ children }: props) {
    return (
        <span
            className={clss(
                "select-none",
                "transition-colors duration-500",
                "text-sm dark:text-pastel-gray",
            )}
        >
            {children}
        </span>
    );
}
