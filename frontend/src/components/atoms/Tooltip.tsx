import type { ReactNode } from "react";
import clss from "classnames";

type props = {
    readonly children: ReactNode;
    readonly className?: string;
    readonly onClick?: () => void;
};

export function Tooltip({ onClick, children }: props) {
    return (
        <div
            className={clss(
                "bg-white dark:bg-dark-light",
                "transition-all duration-500",
                "px-2 p-1 rounded-md",
                "shadow-sm shadow-gray-500",
            )}
            onClick={onClick}
        >
            {children}
        </div>
    );
}