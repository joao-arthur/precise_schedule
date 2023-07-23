import type { ReactNode } from "react";
import { InputTitle } from "./InputTitle";

type props = {
    readonly name: string;
    readonly title: string;
    readonly children: ReactNode;
};

export function InputWrapper({ name, title, children }: props) {
    return (
        <div className="flex flex-col flex-1 py-1">
            <InputTitle name={name} title={title} />
            {children}
        </div>
    );
}
