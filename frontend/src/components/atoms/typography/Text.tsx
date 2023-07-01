import type { ReactNode } from "react";
import clss from "classnames";

type props = {
    readonly children: ReactNode;
    readonly className?: string;
    readonly disabled?: boolean;
    readonly onClick?: () => void;
};

export function Text(
    { onClick, className, disabled, children }: props,
) {
    return (
        <span
            className={clss(
                "select-none",
                "transition-colors duration-500",
                {
                    "dark:text-gray-500": disabled,
                    "dark:text-pastel-gray": !disabled,
                },
                className,
            )}
            onClick={onClick}
        >
            {children}
        </span>
    );
}
