import type { ReactNode } from "react";
import { BaseButton } from "./BaseButton";

type props = {
    readonly children: ReactNode;
    readonly title?: string;
};

export function DisabledButton({ children, title }: props) {
    return (
        <BaseButton
            type="button"
            title={title}
            className="cursor-not-allowed text-white bg-gray-300 dark:bg-gray-800"
        >
            {children}
        </BaseButton>
    );
}
