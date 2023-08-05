import cl from "classnames";
import { Icon } from "./Icon";

export function SuccessBadge() {
    return (
        <div
            className={cl(
                "rounded-full border-2",
                "border-green-700 bg-green-100",
                "transition-colors duration-500",
                "dark:bg-dark",
            )}
        >
            <Icon name="check" className="fill-green-700 w-5 h-5" />
        </div>
    );
}
