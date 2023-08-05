import type { ReactNode } from "react";
import { cl } from "@/lib/cl";

type props = {
    readonly left?: ReactNode;
    readonly center?: ReactNode;
    readonly right?: ReactNode;
};

export function SubHeader({ left, center, right }: props) {
    return (
        <div
            className={cl(
                "mb-2",
                "flex items-center justify-between py-1 px-3",
                "shadow-sm shadow-gray-500",
                "transition-colors duration-500",
            )}
        >
            <div className="flex w-32">{left}</div>
            <div className="flex w-96 justify-center">{center}</div>
            <div className="flex w-32 justify-end">{right}</div>
        </div>
    );
}
