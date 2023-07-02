import type { FormEvent, ReactNode } from "react";

type props = {
    readonly id: string;
    readonly onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    readonly children: ReactNode;
};

export function ModalForm({ id, onSubmit, children }: props) {
    return (
        <form id={id} className="px-3 py-2" onSubmit={onSubmit}>
            {children}
        </form>
    );
}
