import type { ReactNode } from "react";
import { DisabledButton } from "./DisabledButton";
import { SecondaryButton } from "./SecondaryButton";
import { PrimaryButton } from "./PrimaryButton";

type props = {
    readonly type?: "PRIMARY" | "SECONDARY" | "DISABLED";
    readonly onClick?: () => void;
    readonly children: ReactNode;
    readonly title?: string;
    readonly form?: string;
};

export function Button({ type = "PRIMARY", onClick, children, title, form }: props) {
    switch (type) {
        case "PRIMARY":
            return (
                <PrimaryButton title={title} onClick={onClick} form={form}>
                    {children}
                </PrimaryButton>
            );
        case "SECONDARY":
            return <SecondaryButton title={title} onClick={onClick}>{children}</SecondaryButton>;
        case "DISABLED":
            return <DisabledButton title={title}>{children}</DisabledButton>;
    }
}
