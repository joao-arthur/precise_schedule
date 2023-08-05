import type { IconName } from "../Icon";
import cl from "classnames";
import { Icon } from "../Icon";

type props = {
    readonly className: string;
    readonly icon: IconName;
    readonly onClick?: () => void;
};

export function FloatingButton({ className, icon, onClick }: props) {
    return (
        <button
            onClick={onClick}
            className={cl(
                "rounded-full bg-primary active:bg-primary-dark",
                "shadow-sm shadow-gray-800",
            )}
        >
            <Icon
                name={icon}
                className={cl("fill-white p-3", className)}
            />
        </button>
    );
}
