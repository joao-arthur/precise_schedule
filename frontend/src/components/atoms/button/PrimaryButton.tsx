import type { ReactNode } from "react";
import { BaseButton } from "./BaseButton";
import { cl } from "@/lib/cl";

type props = {
    readonly children: ReactNode;
    readonly onClick?: () => void;
    readonly title?: string;
    readonly form?: string;
};

export function PrimaryButton(
    { children, title, onClick, form }: props,
) {
    return (
        <BaseButton
            title={title}
            onClick={onClick}
            form={form}
            className={cl(
                "text-white",
                "bg-prm dark:bg-prm-dk",
                "hover:bg-prm-dk dark:hover:bg-prm-dk2",
                "active:bg-prm-dk2 dark:active:bg-prm-dk3",
            )}
        >
            {children}
        </BaseButton>
    );
}
