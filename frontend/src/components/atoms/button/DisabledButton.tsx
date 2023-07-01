import type { ReactNode } from "react";
import { BaseButton } from "./BaseButton";

type props = {
    readonly children: ReactNode;
    readonly title?: string;
};

export function DisabledButton({ children, title }: props) {
    return (
        <BaseButton
            title={title}
            className="cursor-default bg-gray-300 text-white"
        >
            {children}
        </BaseButton>
    );
}
