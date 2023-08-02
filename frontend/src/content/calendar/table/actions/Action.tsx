import { names } from "@/components/atoms/Icon";
import { FloatingButton } from "@/components/atoms/button/FloatingButton";
import { Tooltip } from "@/components/atoms/Tooltip";
import { Text } from "@/components/atoms/Text";

type props = {
    readonly title: string;
    readonly icon: names;
    readonly onClick: () => void;
};

export function Action({ title, icon, onClick }: props) {
    return (
        <div className="flex items-center gap-5">
            <Tooltip>
                <Text>{title}</Text>
            </Tooltip>
            <FloatingButton
                className="w-14 h-14"
                icon={icon}
                onClick={onClick}
            />
        </div>
    );
}
