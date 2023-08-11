import type { ReactNode } from "react";
import { cl } from "@/lib/cl";

type props = {
    readonly children: ReactNode;
    readonly filled?: boolean;
};

export function BorderedBox({ children, filled }: props) {
    return (
        <div
            className={cl(
                "border border-gray-500 rounded p-3",
                {
                    "bg-pastel-gray dark:bg-drk": !!filled,
                    "transition-colors duration-100": !!filled,
                },
            )}
        >
            {children}
        </div>
    );
}
