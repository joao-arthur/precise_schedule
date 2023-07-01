import type { ReactNode } from "react";
import classNames from "classnames";

type props = {
    readonly children: ReactNode;
};

export function TextSmall({ children }: props) {
    return (
        <span
            className={classNames(
                "select-none text-xs",
                "transition-colors duration-500 dark:text-pastel-gray",
            )}
        >
            {children}
        </span>
    );
}
