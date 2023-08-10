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
                "text-white text-center cursor-pointer py-1 px-2 rounded",
                "hover:bg-prm-lg active:bg-prm-lg2",
                "dark:hover:bg-prm dark:active:bg-prm-lg",
                "transition-colors duration-100",
            )}
        >
            {children}
        </button>
    );
}
