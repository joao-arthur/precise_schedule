import type { ReactNode } from "react";
import { cl } from "@/lib/cl";

type props = {
    readonly onClick?: () => void;
    readonly children: ReactNode;
};

export function HoverButton({ onClick, children }: props) {
    return (
        <button
            onClick={onClick}
            className={cl(
                "border-none cursor-pointer py-1 px-2 w-20 text-center",
                "text-white rounded",
                "hover:bg-primary-light dark:hover:bg-primary",
                "transition-colors duration-300",
            )}
        >
            {children}
        </button>
    );
}
