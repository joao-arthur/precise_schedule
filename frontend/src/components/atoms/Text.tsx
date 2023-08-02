import type { ReactNode } from "react";
import clss from "classnames";

type props = {
    readonly children: ReactNode;
    readonly disabled?: boolean;
    readonly size?:
        | "xs"
        | "sm"
        | "lg"
        | "xl"
        | "2xl"
        | "3xl";
    readonly color?: "white";
};

export function Text({ children, disabled, size, color }: props) {
    return (
        <span
            className={clss(
                "select-none",
                "transition-colors duration-500",
                clss(
                    disabled
                        ? "text-gray-500 dark:text-gray-500"
                        : "text-dark dark:text-pastel-gray",
                    {
                        "text-xs": size === "xs",
                        "text-sm": size === "sm",
                        "text-lg": size === "lg",
                        "text-xl": size === "xl",
                        "text-2xl": size === "2xl",
                        "text-3xl": size === "3xl",
                    },
                    {
                        "text-white": color === "white",
                    },
                ),
            )}
        >
            {children}
        </span>
    );
}
