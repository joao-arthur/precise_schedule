import type { ReactNode } from "react";
import clss from "classnames";

type props = {
    readonly children: ReactNode;
    readonly size:
        | "xs"
        | "sm"
        | "lg"
        | "xl"
        | "3xl";
    readonly disabled?: boolean;
};

export function Text2({ children, size, disabled }: props) {
    return (
        <span
            className={clss(
                "select-none",
                "transition-colors duration-500",
                clss(
                    {
                        "text-xs": size === "xs",
                        "text-sm": size === "sm",
                        "text-lg": size === "lg",
                        "text-xl": size === "xl",
                        "text-3xl": size === "3xl",
                    },
                    disabled
                        ? "text-gray-500 dark:text-gray-500"
                        : "text-dark dark:text-pastel-gray",
                ),
            )}
        >
            {children}
        </span>
    );
}
