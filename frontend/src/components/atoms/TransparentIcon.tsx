import type { IconName } from "@/components/atoms/Icon";
import { Icon } from "./Icon";

type props = {
    readonly icon: IconName;
    readonly onClick: () => void;
};

export function TransparentIcon({ onClick, icon }: props) {
    return (
        <button onClick={onClick}>
            <Icon
                size={9}
                fill="white"
                className="fill-white active:fill-prm-lg2"
                name={icon}
            />
        </button>
    );
}
