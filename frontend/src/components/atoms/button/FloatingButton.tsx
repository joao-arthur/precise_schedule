import clss from "classnames";
import { Icon, names } from "../Icon";

type props = {
    readonly className: string;
    readonly icon: names;
    readonly onClick?: () => void;
};

export function FloatingButton({ className, icon, onClick }: props) {
    return (
        <button
            onClick={onClick}
            className={clss(
                "rounded-full bg-primary active:bg-primary-dark",
                "shadow-sm shadow-gray-800",
            )}
        >
            <Icon
                name={icon}
                className={clss("fill-white p-3", className)}
            />
        </button>
    );
}
