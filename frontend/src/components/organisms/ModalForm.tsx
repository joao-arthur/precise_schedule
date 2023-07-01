import type { ReactNode } from "react";
import { FormEvent } from "react";

type props = {
    readonly onSubmit: () => void;
    readonly children: ReactNode;
};

export function ModalForm(
    { onSubmit, children }: props,
) {
    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        onSubmit();
    }

    return (
        <div className="flex flex-col w-full">
            <form className="px-3" onSubmit={handleSubmit}>
                {children}
            </form>
        </div>
    );
}
