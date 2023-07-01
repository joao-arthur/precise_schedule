import type { ReactNode } from "react";
import clss from "classnames";

type props = {
    readonly left?: ReactNode;
    readonly center?: ReactNode;
    readonly right?: ReactNode;
};

export function SubHeader({ left, center, right }: props) {
    return (
        <div
            className={clss(
                "flex items-center border-b justify-between py-1 px-3",
                "border-gray-300 dark:border-gray-500",
                "transition-colors duration-500",
            )}
        >
            <div className="flex w-32">{left}</div>
            <div className="flex w-96 justify-center">{center}</div>
            <div className="flex w-32 justify-end">{right}</div>
        </div>
    );
}
