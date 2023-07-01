import type { ReactNode } from "react";
import BaseLink from "next/link";

type props = {
    readonly to: string;
    readonly children: ReactNode;
};

export function LinkButton({ to, children }: props) {
    return (
        <BaseLink
            href={to}
            className="text-white border-none cursor-pointer font-semibold px-2 text hover:text-gray-200"
        >
            {children}
        </BaseLink>
    );
}
