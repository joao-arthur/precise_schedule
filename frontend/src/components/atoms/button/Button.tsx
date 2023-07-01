import type { ReactNode } from "react";
import { DisabledButton } from "./DisabledButton";
import { SecondaryButton } from "./SecondaryButton";
import { PrimaryButton } from "./PrimaryButton";

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
}: props) {
    if (disabled) {
        return (
            <DisabledButton title={title}>
                {children}
            </DisabledButton>
        );
    }
    if (secondary) {
        return (
            <SecondaryButton title={title} onClick={onClick}>
                {children}
            </SecondaryButton>
        );
    }
    return (
        <PrimaryButton title={title} onClick={onClick}>
            {children}
        </PrimaryButton>
    );
}
