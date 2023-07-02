import type { ReactNode } from "react";
import clss from "classnames";

type props = {
    readonly children: ReactNode;
    readonly className?: string;
    readonly onClick?: () => void;
};

export function FilledText(
    { onClick, className, children }: props,
) {
    return (
        <span
            className={clss(
                "px-2 p-1 select-none rounded-md",
                "border dark:border-gray-600",
                "bg-white dark:bg-dark-light",
                "transition-colors duration-500",
                "dark:text-pastel-gray",
                "shadow-sm shadow-gray-800",
                className,
            )}
            onClick={onClick}
        >
            {children}
        </span>
    );
}
