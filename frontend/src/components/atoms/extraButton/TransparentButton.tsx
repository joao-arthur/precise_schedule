import type { ReactNode } from "react";
import { cl } from "@/lib/cl";

type props = {
    readonly onClick?: () => void;
    readonly children: ReactNode;
};

export function TransparentButton({ onClick, children }: props) {
    return (
        <button
            onClick={onClick}
            className={cl(
                "flex rounded-md",
                "hover:bg-gray-200 active:bg-gray-300",
                "dark:hover:bg-drk-dk dark:active:bg-drk",
            )}
        >
            {children}
        </button>
    );
}
