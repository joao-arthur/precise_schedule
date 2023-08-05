import type { IconName } from "@/components/atoms/Icon";
import cl from "classnames";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";

type props = {
    readonly name: string;
    readonly icon: IconName;
};

export function UserMenuItem({ name, icon }: props) {
    return (
        <li
            className={cl(
                "py-3 pr-7 pl-5 cursor-pointer flex items-center rounded",
                "hover:bg-gray-100 dark:hover:bg-dark",
                "gap-5",
            )}
        >
            <Icon
                name={icon}
                fill="primary"
                className="w-5 h-5"
            />
            <Text>{name}</Text>
        </li>
    );
}
