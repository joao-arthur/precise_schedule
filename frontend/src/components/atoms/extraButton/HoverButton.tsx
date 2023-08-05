import type { ReactNode } from "react";
import cl from "classnames";

type props = {
    readonly children: ReactNode;
};

export function HoverButton({ children }: props) {
    return (
        <button
            className={cl(
                "border-none cursor-pointer py-1 px-2 w-20 text-center",
                "text-white rounded",
                "hover:bg-primary dark:hover:bg-primary-dark",
                "transition-colors duration-500",
            )}
        >
            {children}
        </button>
    );
}
