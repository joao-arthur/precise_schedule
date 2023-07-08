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
                "bg-white dark:bg-dark-light",
                "dark:text-pastel-gray",
                "shadow-sm shadow-gray-500",
                "transition-all duration-500",
                className,
            )}
            onClick={onClick}
        >
            {children}
        </span>
    );
}
