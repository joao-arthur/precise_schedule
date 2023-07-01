import type { ReactNode } from "react";
import clss from "classnames";

type props = {
    readonly children: ReactNode;
};

export function FilledBox({ children }: props) {
    return (
        <div
            className={clss(
                "border border-gray-500 rounded p-3",
                "bg-gray-50 dark:bg-dark",
                "transition-colors duration-500",
            )}
        >
            {children}
        </div>
    );
}
