import type { ReactNode } from "react";
import classNames from "classnames";

type props = {
    readonly children: ReactNode;
    readonly onClick?: () => void;
    readonly disabled?: boolean;
    readonly secondary?: boolean;
    readonly className?: string;
    readonly title?: string;
};

export function Button({
    children,
    title,
    onClick,
    disabled,
    secondary,
    className,
}: props) {
    const primaryClass =
        "text-white bg-primary hover:bg-primary-dark active:bg-primary-darker";
    const secondaryClass =
        "text-primary hover:bg-gray-200 active:bg-gray-300 active:text-primary-dark dark:bg-dark dark:hover:bg-dark-light dark:active:bg-dark-light dark:active:text-primary-light";
    const disabledClass = "cursor-default bg-gray-300 text-white";

    return (
        <button
            title={title}
            onClick={onClick}
            className={classNames(
                "py-4 text-lg rounded",
                {
                    [disabledClass]: disabled,
                    [primaryClass]: !disabled && !secondary,
                    [secondaryClass]: !disabled && secondary,
                },
                className,
            )}
        >
            {children}
        </button>
    );
}
