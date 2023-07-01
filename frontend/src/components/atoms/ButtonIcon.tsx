import clss from "classnames";
import { Icon, names } from "./Icon";

type props = {
    readonly name: names;
    readonly onClick?: () => void;
    readonly size: "medium" | "big";
};

export function ButtonIcon({ name, onClick, size }: props) {
    return (
        <button
            onClick={onClick}
            className={clss(
                "flex items-center justify-center rounded border border-transparent",
                "hover:border-gray-300 active:border-gray-300 hover:bg-gray-100 active:bg-gray-200",
                "dark:hover:border-gray-500 dark:active:border-gray-500 dark:hover:bg-dark-light dark:active:bg-dark",
                {
                    "w-10 h-10": size === "medium",
                    "w-12 h-12": size === "big",
                },
            )}
        >
            <Icon
                name={name}
                className={clss(
                    "fill-gray-500",
                    {
                        "w-6 h-6": size === "medium",
                        "w-7 h-7": size === "big",
                    },
                )}
            />
        </button>
    );
}
