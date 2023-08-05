import type { ReactNode } from "react";

type props = {
    readonly children: ReactNode;
};

export function FormContainer({ children }: props) {
    return (
        <div className="flex flex-col gap-3 mb-10">
            {children}
        </div>
    );
}
