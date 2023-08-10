import type { IconColor, IconName, IconSize } from "../atoms/Icon";
import { Icon } from "../atoms/Icon";
import { RoundButton } from "../atoms/extraButton/RoundButton";

type props = {
    readonly onClick?: () => void;
    readonly title?: string;
    readonly icon: IconName;
    readonly size?: IconSize;
    readonly color?: IconColor;
};

export function RoundButtonIcon({ onClick, title, icon, size, color = "white" }: props) {
    return (
        <RoundButton onClick={onClick} title={title}>
            <div className="box-content p-2">
                <Icon name={icon} size={size} color={color} colorDark={color} />
            </div>
        </RoundButton>
    );
}
