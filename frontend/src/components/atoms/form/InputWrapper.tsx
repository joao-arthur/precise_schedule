import type { ReactNode } from "react";
import { cl } from "@/lib/cl";
import { Text } from "../Text";

type props = {
    readonly name: string;
    readonly title: string;
    readonly children: ReactNode;
    readonly hidden?: boolean;
};

export function InputWrapper({ name, title, children, hidden }: props) {
    return (
        <div className={cl("flex flex-col flex-1 py-1", hidden ? "hidden" : "")}>
            <label className="py-1" htmlFor={name}>
                <Text>{title}</Text>
            </label>
            {children}
        </div>
    );
}
