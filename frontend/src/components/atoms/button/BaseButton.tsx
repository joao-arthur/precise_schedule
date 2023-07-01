import type { ReactNode } from "react";
import clss from "classnames";

type props = {
    readonly className: string;
    readonly children: ReactNode;
    readonly onClick?: () => void;
    readonly title?: string;
};

export function BaseButton(
    { children, title, onClick, className }: props,
) {
    return (
        <button
            title={title}
            onClick={onClick}
            className={clss("py-4 text-lg rounded w-full", className)}
        >
            {children}
        </button>
    );
}
