import type { ReactNode } from "react";
import { cl } from "@/lib/cl";
import { BaseButton } from "./BaseButton";

type props = {
    readonly children: ReactNode;
    readonly onClick?: () => void;
    readonly title?: string;
};

export function SecondaryButton({ children, title, onClick }: props) {
    return (
        <BaseButton
            title={title}
            onClick={onClick}
            className={cl(
                "text-prm",
                "bg-gray-200 dark:bg-dark-light",
                "active:bg-gray-300 dark:active:bg-dark-lighter",
                "active:text-prm-dk dark:active:text-prm-lg",
            )}
        >
            {children}
        </BaseButton>
    );
}
