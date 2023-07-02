import type { ReactNode } from "react";
import clss from "classnames";
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
            className={clss(
                "text-primary",
                "bg-gray-200 dark:bg-dark-light",
                "active:bg-gray-300 dark:active:bg-dark-lighter",
                "active:text-primary-dark dark:active:text-primary-light",
            )}
        >
            {children}
        </BaseButton>
    );
}
