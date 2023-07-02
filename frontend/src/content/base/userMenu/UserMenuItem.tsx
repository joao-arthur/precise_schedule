import clss from "classnames";
import { Icon, names } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/typography/Text";

type props = {
    readonly name: string;
    readonly icon: names;
};

export function UserMenuItem({ name, icon }: props) {
    return (
        <li
            className={clss(
                "py-3 pr-7 pl-5 cursor-pointer flex items-center rounded",
                "hover:bg-gray-100 dark:hover:bg-dark",
                "gap-5",
            )}
        >
            <Icon
                name={icon}
                className="fill-primary w-5 h-5"
            />
            <Text>{name}</Text>
        </li>
    );
}
