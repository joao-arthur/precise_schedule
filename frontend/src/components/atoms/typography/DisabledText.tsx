import type { ReactNode } from "react";
import clss from "classnames";

type props = {
    readonly children: ReactNode;
    readonly className: string;
    readonly onClick: () => void;
};

export function DisabledText(
    { onClick, className, children }: props,
) {
    return (
        <span
            className={clss(
                "select-none",
                "transition-colors duration-500",
                "text-gray-500 dark:text-gray-500",
                className,
            )}
            onClick={onClick}
        >
            {children}
        </span>
    );
}
