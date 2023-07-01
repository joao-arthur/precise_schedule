import type { ReactNode } from "react";

type params = {
    readonly condition: boolean;
    readonly children: ReactNode;
};

export function If({ condition, children }: params) {
    return condition ? <>{children}</> : null;
}
