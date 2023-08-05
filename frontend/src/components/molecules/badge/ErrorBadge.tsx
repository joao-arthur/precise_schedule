import { cl } from "@/lib/cl";
import { Icon } from "../../atoms/Icon";
import { BaseBadge } from "./BaseBadge";

export function ErrorBadge() {
    return (
        <BaseBadge
            className={cl(
                "border-red-200 dark:border-red-500",
                "bg-red-200 dark:bg-red-500",
            )}
        >
            <Icon
                name="x"
                className="fill-red-500 dark:fill-white w-5 h-5"
            />
        </BaseBadge>
    );
}
