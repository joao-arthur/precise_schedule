import type { ReactNode } from "react";
import classNames from "classnames";

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
            className={classNames(
                "transition-colors duration-500 select-none",
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
