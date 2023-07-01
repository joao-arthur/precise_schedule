import { Icon, names } from "./Icon";

type props = {
    readonly name: names;
    readonly size: number;
    readonly color: string;
    readonly onClick: () => void;
};

export function TransparentIcon(
    { onClick, name, size, color }: props,
) {
    return (
        <button onClick={onClick}>
            <Icon name={name} size={size} color={color} />
        </button>
    );
}
