import type { ReactNode } from "react";

type props = {
    readonly children: ReactNode;
};

export function Box({ children }: props) {
    return (
        <div className="border border-gray-500 rounded p-3">
            {children}
        </div>
    );
}
