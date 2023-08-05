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
            className={cl("py-5 text-lg rounded w-full", className)}
        >
            {children}
        </button>
    );
}
