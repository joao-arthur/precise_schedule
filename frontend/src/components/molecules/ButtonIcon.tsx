import type { IconName } from "../atoms/Icon";
import { cl } from "@/lib/cl";
import { Icon } from "../atoms/Icon";
import { TransparentButton } from "../atoms/extraButton/TransparentButton";

type props = {
    readonly name: IconName;
    readonly onClick?: () => void;
    readonly size: "medium" | "big";
};

export function ButtonIcon({ name, onClick, size }: props) {
    return (
        <TransparentButton onClick={onClick}>
            <Icon
                name={name}
                fill="gray-500"
                className={cl(
                    "box-content",
                    {
                        "w-6 h-6 p-2": size === "medium",
                        "w-9 h-9 p-3": size === "big",
                    },
                )}
            />
        </TransparentButton>
    );
}
