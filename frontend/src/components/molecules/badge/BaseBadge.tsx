import type { ReactNode } from "react";
import cl from "classnames";

type props = {
    readonly className: string;
    readonly children: ReactNode;
};

export function BaseBadge({ className, children }: props) {
    return (
        <div
            className={cl(
                "rounded-full p-0.5",
                "transition-colors duration-500",
                className,
            )}
        >
            {children}
        </div>
    );
}
