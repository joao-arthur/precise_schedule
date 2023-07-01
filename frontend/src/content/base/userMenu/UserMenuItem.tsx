import classNames from "classnames";
import { Icon, names } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/typography/Text";

type props = {
    readonly name: string;
    readonly icon: names;
};

export function UserMenuItem({ name, icon }: props) {
    return (
        <li
            className={classNames(
                "py-3 pr-7 pl-5 cursor-pointer flex items-center rounded",
                "hover:bg-gray-100 dark:hover:bg-dark",
            )}
        >
            <Icon
                className="mr-5"
                name={icon}
                size={20}
                color="gray"
            />
            <Text>{name}</Text>
        </li>
    );
}
