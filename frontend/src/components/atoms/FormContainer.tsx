import type { ReactNode } from "react";

type props = {
    readonly children: ReactNode;
};

export function FormContainer({ children }: props) {
    return (
        <div className="mb-10">
            {children}
        </div>
    );
}
