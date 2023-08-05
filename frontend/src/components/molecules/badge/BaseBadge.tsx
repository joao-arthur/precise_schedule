import type { IconName } from "../../atoms/Icon";
import cl from "classnames";
import { Icon } from "../../atoms/Icon";

type props = {
    readonly className: string;
    readonly iconName: IconName;
    readonly iconClassName: string;
};

export function BaseBadge({
    className,
    iconName,
    iconClassName,
}: props) {
    return (
        <div
            className={cl(
                "rounded-full border-2",
                "transition-colors duration-500",
                "dark:bg-dark-light",
                className,
            )}
        >
            <Icon name={iconName} className={iconClassName} />
        </div>
    );
}
