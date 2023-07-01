import { Icon, names } from "./Icon";

type props = {
    readonly name: names;
    readonly className: string;
    readonly onClick: () => void;
};

export function TransparentIcon({ onClick, name, className }: props) {
    return (
        <button onClick={onClick}>
            <Icon name={name} className={className} />
        </button>
    );
}
