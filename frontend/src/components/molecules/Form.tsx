import type { FormEvent, ReactNode } from "react";
import { Button } from "../atoms/button/Button";
import { FilledBox } from "../atoms/layout/FilledBox";

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
        <div className="flex flex-col">
            <FilledBox>
                <form onSubmit={onSubmit}>
                    {children}
                    <div className="mt-3">
                        <Button disabled={disabled}>
                            {action}
                        </Button>
                    </div>
                </form>
            </FilledBox>
        </div>
    );
}
