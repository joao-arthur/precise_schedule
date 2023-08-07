import type { FormEvent, ReactNode } from "react";
import { Button } from "../atoms/button/Button";

type props = {
    readonly action: string;
    readonly disabled: boolean;
    readonly onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    readonly children: ReactNode;
};

export function Form({
    action,
    disabled,
    onSubmit,
    children,
}: props) {
    return (
        <form onSubmit={onSubmit}>
            {children}
            <div className="mt-3">
                <Button type={disabled ? "DISABLED" : "PRIMARY"}>
                    {action}
                </Button>
            </div>
        </form>
    );
}
