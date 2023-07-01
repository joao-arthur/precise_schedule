import type { ReactNode } from "react";
import BaseLink from "next/link";

type props = {
    readonly to: string;
    readonly children: ReactNode;
};

export function Link({ to, children }: props) {
    return (
        <BaseLink
            href={to}
            className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"
        >
            {children}
        </BaseLink>
    );
}
