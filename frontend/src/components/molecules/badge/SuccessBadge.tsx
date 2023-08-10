import { cl } from "@/lib/cl";
import { Icon } from "../../atoms/Icon";
import { BaseBadge } from "./BaseBadge";

export function SuccessBadge() {
    return (
        <BaseBadge
            className={cl(
                "border-green-300 dark:border-green-600",
                "bg-green-300 dark:bg-green-600",
                "fill-green-600 dark:fill-white",
            )}
        >
            <Icon name="v" color="green" colorDark="white" />
        </BaseBadge>
    );
}
