import type { FormEvent, ReactNode } from "react";
import { Button } from "../atoms/button/Button";
import { BorderedBox } from "../atoms/layout/BorderedBox";

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
        <BorderedBox filled>
            <div className="flex flex-col">
                <form onSubmit={onSubmit}>
                    {children}
                    <div className="mt-3">
                        <Button type={disabled ? "DISABLED" : "PRIMARY"}>
                            {action}
                        </Button>
                    </div>
                </form>
            </div>
        </BorderedBox>
    );
}
