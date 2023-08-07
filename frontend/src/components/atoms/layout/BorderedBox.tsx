import type { ReactNode } from "react";
import { cl } from "@/lib/cl";

type props = {
    readonly children: ReactNode;
    readonly filled?: true;
};

export function BorderedBox({ children, filled }: props) {
    return (
        <div
            className={cl(
                "border border-gray-500 rounded p-3",
                filled ? "bg-gray-50 dark:bg-dark" : "",
                filled ? "transition-colors duration-100" : "",
            )}
        >
            {children}
        </div>
    );
}
