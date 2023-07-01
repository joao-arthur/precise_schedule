import type { FormEvent, ReactNode } from "react";
import { Button } from "../atoms/Button";
import { Text } from "../atoms/typography/Text";
import { FilledBox } from "../atoms/layout/FilledBox";

type props = {
    readonly title: string;
    readonly action: string;
    readonly loading?: boolean;
    readonly onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    readonly children: ReactNode;
};

export function Form({
    title,
    action,
    loading,
    onSubmit,
    children,
}: props) {
    return (
        <div className="flex flex-col">
            <div className="text-center py-3">
                <Text>{title}</Text>
            </div>
            <FilledBox>
                <form onSubmit={onSubmit}>
                    {children}
                    <Button
                        className="w-full mt-3"
                        disabled={loading}
                    >
                        {action}
                    </Button>
                </form>
            </FilledBox>
        </div>
    );
}
