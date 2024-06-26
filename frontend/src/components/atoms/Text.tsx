import type { ReactNode } from "react";
import { cl } from "@/lib/cl";

type props = {
    readonly children: ReactNode;
    readonly disabled?: boolean;
    readonly selectable?: boolean;
    readonly bold?: boolean;
    readonly size?:
        | "xs"
        | "sm"
        | "lg"
        | "xl"
        | "2xl"
        | "3xl";
    readonly color?: "white" | "prm";
};

export function Text({ children, disabled, selectable, bold, size, color }: props) {
    return (
        <span
            className={cl(
                "transition-colors duration-100",
                "text-ellipsis whitespace-nowrap overflow-hidden",
                selectable ? "" : "select-none",
                {
                    "font-bold": bold,
                    "text-xs": size === "xs",
                    "text-sm": size === "sm",
                    "text-lg": size === "lg",
                    "text-xl": size === "xl",
                    "text-2xl": size === "2xl",
                    "text-3xl": size === "3xl",
                },
                {
                    "text-white": color === "white",
                    "text-prm": color === "prm",
                    "text-drk-dk dark:text-pastel-gray": !color,
                    "text-gray-500 dark:text-gray-500": disabled === true,
                },
            )}
        >
            {children}
        </span>
    );
}
