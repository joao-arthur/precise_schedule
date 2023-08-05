import { Icon, type IconName } from "@/components/atoms/Icon";
import { RoundButton } from "@/components/atoms/extraButton/RoundButton";
import { Tooltip } from "@/components/atoms/Tooltip";
import { Text } from "@/components/atoms/Text";

type props = {
    readonly title: string;
    readonly icon: IconName;
    readonly onClick: () => void;
};

export function Action({ title, icon, onClick }: props) {
    return (
        <div className="flex items-center gap-5">
            <Tooltip>
                <Text>{title}</Text>
            </Tooltip>
            <RoundButton
                onClick={onClick}
            >
                <Icon
                    name={icon}
                    fill="white"
                    className="p-3 w-14 h-14"
                />
            </RoundButton>
        </div>
    );
}
