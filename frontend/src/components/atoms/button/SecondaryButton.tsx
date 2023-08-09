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
            type="button"
            title={title}
            onClick={onClick}
            className={cl(
                "text-prm",
                "bg-gray-200 hover:bg-gray-300 active:bg-gray-400",
                "dark:bg-drk-lg dark:hover:bg-drk-dk dark:active:bg-drk-dk2",
            )}
        >
            {children}
        </BaseButton>
    );
}
