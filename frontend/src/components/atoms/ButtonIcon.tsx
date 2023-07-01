import classNames from "classnames";
import { Icon, names } from "./Icon";
import { useDevice } from "@/lib/device/useDevice";

type props = {
    readonly name: names;
    readonly title?: string;
    readonly onClick?: () => void;
    readonly className?: string;
    readonly type?: "medium" | "big" | "bigicon";
};

export function ButtonIcon({
    name,
    title,
    onClick,
    className,
    type = "medium",
}: props) {
    function getSize() {
        switch (type) {
            case "medium":
                return 25;
            case "big":
                return 30;
            case "bigicon":
                return 25;
        }
    }

    function getButtonSize() {
        switch (type) {
            case "medium":
                return 40;
            case "big":
                return 50;
            case "bigicon":
                return 40;
        }
    }

    return (
        <button
            title={title}
            onClick={onClick}
            className={classNames(
                "flex items-center justify-center rounded border border-transparent",
                "hover:border-gray-300 active:border-gray-300 hover:bg-gray-100 active:bg-gray-200",
                "dark:hover:border-gray-500 dark:active:border-gray-500 dark:hover:bg-dark-light dark:active:bg-dark",
                {
                    "mx-2": type === "medium",
                    "m-3": type === "big",
                },
                className,
            )}
            style={{
                height: getButtonSize(),
                width: getButtonSize(),
            }}
        >
            <Icon name={name} size={getSize()} color="gray" />
        </button>
    );
}
