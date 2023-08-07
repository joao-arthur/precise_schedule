import type { ReactNode } from "react";
import { cl } from "@/lib/cl";

type props = {
    readonly className: string;
    readonly children: ReactNode;
    readonly onClick?: () => void;
    readonly title?: string;
    readonly form?: string;
};

export function BaseButton(
    { children, title, onClick, className, form }: props,
) {
    return (
        <button
            title={title}
            onClick={onClick}
            form={form}
            className={cl(
                "h-20 rounded w-full text-lg",
                "transition-all duration-100",
                className,
            )}
        >
            {children}
        </button>
    );
}
