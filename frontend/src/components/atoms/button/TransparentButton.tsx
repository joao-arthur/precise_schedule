import type { ReactNode } from "react";
import cl from "classnames";

type props = {
    readonly onClick?: () => void;
    readonly children: ReactNode;
};

export function TransparentButton({ onClick, children }: props) {
    return (
        <button
            onClick={onClick}
            className={cl(
                "flex rounded border",
                "border-transparent",
                "hover:border-gray-300 dark:hover:border-gray-500",
                "active:border-gray-300 dark:active:border-gray-500",
                "hover:bg-gray-100 dark:hover:bg-dark-light",
                "active:bg-gray-200 dark:active:bg-dark",
            )}
        >
            {children}
        </button>
    );
}
