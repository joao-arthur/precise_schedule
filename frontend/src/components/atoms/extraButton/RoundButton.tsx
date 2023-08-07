import type { ReactNode } from "react";
import { cl } from "@/lib/cl";

type props = {
    readonly onClick?: () => void;
    readonly children: ReactNode;
};

export function RoundButton({ onClick, children }: props) {
    return (
        <button
            onClick={onClick}
            className={cl(
                "rounded-full",
                "hover:bg-prm-lg active:bg-prm-lg2",
                "dark:hover:bg-prm dark:active:bg-prm-lg",
                "transition-colors duration-100",
            )}
        >
            {children}
        </button>
    );
}
