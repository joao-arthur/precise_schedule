import { cl } from "@/lib/cl";
import { Icon } from "../../atoms/Icon";
import { BaseBadge } from "./BaseBadge";

export function SuccessBadge() {
    return (
        <BaseBadge
            className={cl(
                "border-green-200 dark:border-green-500",
                "bg-green-200 dark:bg-green-500",
            )}
        >
            <Icon
                name="check"
                className="fill-green-600 dark:fill-white w-5 h-5"
            />
        </BaseBadge>
    );
}
