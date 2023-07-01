import type { ReactNode } from "react";
import { Text } from "./typography/Text";
import { TextSmall } from "./typography/TextSmall";
import { If } from "./layout/If";

type props = {
    readonly name: string;
    readonly title: string;
    readonly notice?: string;
    readonly children: ReactNode;
};

export function InputField(props: props) {
    return (
        <div className="flex flex-col flex-1 py-1">
            <label className="py-1" htmlFor={props.name}>
                <Text>{props.title}</Text>
            </label>
            {props.children}
            <If condition={!!props.notice}>
                <TextSmall>{props.notice}</TextSmall>
            </If>
        </div>
    );
}
