import { Action } from "./Action";
import { useState } from "react";
import { Modal } from "@/content/modal/Modal";
import BirthdayEventRegister from "@/content/event/BirthdayEventRegister";

export function BirthdayAction() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Action
                title="BIRTHDAY"
                icon="birthday"
                onClick={() => {
                    setOpen(!open);
                }}
            />
            <Modal
                title="NEW BIRTHDAY"
                visible={open}
                formId="BirthdayEventRegister"
                onCancel={() => {
                    setOpen(false);
                }}
                onConfirm={() => {
                    window.setTimeout(() => setOpen(false), 0);
                }}
            >
                <BirthdayEventRegister />
            </Modal>
        </>
    );
}
