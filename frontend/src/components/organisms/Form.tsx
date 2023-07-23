import type { FormEvent, ReactNode } from "react";
import { Button } from "../atoms/button/Button";
import { FilledBox } from "../atoms/layout/FilledBox";

type props = {
    readonly action: string;
    readonly loading?: boolean;
    readonly onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    readonly children: ReactNode;
};

export function Form({
    action,
    loading,
    onSubmit,
    children,
}: props) {
    return (
        <div className="flex flex-col">
            <FilledBox>
                <form onSubmit={onSubmit}>
                    {children}
                    <div className="mt-3">
                        <Button disabled={loading}>
                            {action}
                        </Button>
                    </div>
                </form>
            </FilledBox>
        </div>
    );
}
