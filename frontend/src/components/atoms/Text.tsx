import type { ReactNode } from "react";
import { cl } from "@/lib/cl";

type props = {
    readonly children: ReactNode;
    readonly disabled?: true;
    readonly selectable?: true;
    readonly size?:
        | "xs"
        | "sm"
        | "lg"
        | "xl"
        | "2xl"
        | "3xl";
    readonly color?: "white";
};

export function Text({ children, disabled, selectable, size, color }: props) {
    return (
        <span
            className={cl(
                "transition-colors duration-500",
                "text-ellipsis whitespace-nowrap overflow-hidden",
                disabled ? "text-gray-500 dark:text-gray-500" : "text-dark dark:text-pastel-gray",
                selectable ? "" : "select-none",
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
            )}
        >
            {children}
        </span>
    );
}
