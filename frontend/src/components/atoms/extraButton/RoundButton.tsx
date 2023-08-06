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
                "bg-primary active:bg-primary-dark",
                "transition-colors duration-300",
            )}
        >
            {children}
        </button>
    );
}
