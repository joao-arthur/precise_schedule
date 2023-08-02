import type { ReactNode } from "react";
import clss from "classnames";
import BaseLink from "next/link";

type props = {
    readonly to: string;
    readonly children: ReactNode;
};

export function LinkButton({ to, children }: props) {
    return (
        <BaseLink
            href={to}
            className={clss(
                "border-none cursor-pointer py-1 px-2 w-20 text-center",
                "text-white rounded",
                "hover:bg-primary dark:hover:bg-primary-dark",
                "transition-colors duration-500",
            )}
        >
            {children}
        </BaseLink>
    );
}
