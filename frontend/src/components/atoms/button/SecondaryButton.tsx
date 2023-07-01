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
                "text-primary dark:bg-dark",
                "hover:bg-gray-200 dark:hover:bg-dark-light",
                "active:bg-gray-300 active:text-primary-dark dark:active:bg-dark-light dark:active:text-primary-light",
            )}
        >
            {children}
        </BaseButton>
    );
}
