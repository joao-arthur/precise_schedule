import type { IconName } from "../atoms/Icon";
import { Icon } from "../atoms/Icon";
import { TransparentButton } from "../atoms/extraButton/TransparentButton";

type props = {
    readonly name: IconName;
    readonly onClick?: () => void;
    readonly size: "medium" | "big";
};

export function ButtonIcon({ name, onClick, size }: props) {
    return (
        <TransparentButton onClick={onClick}>
            <div className="box-content p-2">
                <Icon name={name} fill="gray" size={size === "medium" ? 6 : 9} />
            </div>
        </TransparentButton>
    );
}
