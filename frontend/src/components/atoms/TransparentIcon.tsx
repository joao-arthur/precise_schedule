import type { IconName } from "@/components/atoms/Icon";
import { Icon } from "./Icon";

type props = {
    readonly name: IconName;
    readonly onClick: () => void;
};

export function TransparentIcon({ onClick, name }: props) {
    return (
        <button onClick={onClick}>
            <Icon
                size={9}
                fill="white"
                className="fill-white active:fill-primary-lighter"
                name={name}
            />
        </button>
    );
}
