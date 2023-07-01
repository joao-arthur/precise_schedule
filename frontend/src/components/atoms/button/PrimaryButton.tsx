import type { ReactNode } from "react";
import { BaseButton } from "./BaseButton";

type props = {
    readonly children: ReactNode;
    readonly onClick?: () => void;
    readonly title?: string;
};

export function PrimaryButton({ children, title, onClick }: props) {
    return (
        <BaseButton
            title={title}
            onClick={onClick}
            className="text-white bg-primary active:bg-primary-dark"
        >
            {children}
        </BaseButton>
    );
}
