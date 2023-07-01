import type { ReactNode } from "react";

type props = {
    readonly children: ReactNode;
};

export function Group({ children }: props) {
    return <div className="flex gap-x-3">{children}</div>;
}
