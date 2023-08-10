import type { ReactNode } from "react";
import { Text } from "../Text";

type props = {
    readonly name: string;
    readonly title: string;
    readonly children: ReactNode;
};

export function InputWrapper({ name, title, children }: props) {
    return (
        <div className="flex flex-col flex-1 py-1">
            <label className="py-1" htmlFor={name}>
                <Text>{title}</Text>
            </label>
            {children}
        </div>
    );
}
