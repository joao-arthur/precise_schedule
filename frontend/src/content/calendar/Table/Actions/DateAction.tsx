import { Action } from "./Action";
import { useState } from "react";
import { Modal } from "@/content/modal/Modal";
import DateEventRegister from "@/content/event/DateEventRegister";

export function DateAction() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Action
                title="DATE"
                icon="people"
                onClick={() => {
                    setOpen(!open);
                }}
            />
            <Modal
                title="NEW DATE"
                visible={open}
                formId="DateEventRegister"
                onCancel={() => {
                    setOpen(false);
                }}
                onConfirm={() => {
                    window.setTimeout(() => setOpen(false), 0);
                }}
            >
                <DateEventRegister />
            </Modal>
        </>
    );
}
