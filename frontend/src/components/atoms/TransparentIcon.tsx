import type { IconName } from "@/components/atoms/Icon";
import { Icon } from "./Icon";

type props = {
    readonly name: IconName;
    readonly className: string;
    readonly onClick: () => void;
};

export function TransparentIcon({ onClick, name, className }: props) {
    return (
        <button onClick={onClick}>
            <Icon fill="white" name={name} className={className} />
        </button>
    );
}
