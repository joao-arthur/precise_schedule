import type { IconColor, IconName, IconSize } from "../atoms/Icon";
import { Icon } from "../atoms/Icon";
import { TransparentButton } from "../atoms/extraButton/TransparentButton";

type props = {
    readonly onClick?: () => void;
    readonly title?: string;
    readonly icon: IconName;
    readonly size?: IconSize;
    readonly color?: IconColor;
};

export function TransparentButtonIcon({ onClick, title, icon, size, color }: props) {
    return (
        <TransparentButton onClick={onClick} title={title}>
            <div className="box-content p-2">
                <Icon name={icon} size={size} color={color} colorDark={color} />
            </div>
        </TransparentButton>
    );
}
