import clss from "classnames";
import { Icon } from "./Icon";

export function ErrorBadge() {
    return (
        <div
            className={clss(
                "rounded-full border-2",
                "border-red-500 bg-red-50",
                "transition-colors duration-500",
                "dark:bg-dark-light",
            )}
        >
            <Icon name="x" className="fill-red-500 w-5 h-5" />
        </div>
    );
}
