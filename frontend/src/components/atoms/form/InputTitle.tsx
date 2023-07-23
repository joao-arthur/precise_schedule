import { Text } from "../typography/Text";

type props = {
    readonly name: string;
    readonly title: string;
};

export function InputTitle({ name, title }: props) {
    return (
        <label className="py-1" htmlFor={name}>
            <Text>{title}</Text>
        </label>
    );
}
