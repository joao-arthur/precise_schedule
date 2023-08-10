import type { ReactNode } from "react";
import { cl } from "@/lib/cl";

type props = {
    readonly onClick?: () => void;
    readonly title?: string;
    readonly children: ReactNode;
};

export function RoundButton({ onClick, title, children }: props) {
    return (
        <button
            onClick={onClick}
            title={title}
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
