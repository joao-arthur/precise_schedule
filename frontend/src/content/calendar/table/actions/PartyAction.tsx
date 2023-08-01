import { Action } from "./Action";
import { useState } from "react";
import { Modal } from "@/content/modal/Modal";
import { PartyEventRegister } from "@/content/event/PartyEventRegister";

export function PartyAction() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Action
                title="PARTY"
                icon="party"
                onClick={() => {
                    setOpen(!open);
                }}
            />
            <Modal
                title="NEW PARTY"
                visible={open}
                formId="PartyEventRegister"
                onCancel={() => {
                    setOpen(false);
                }}
                onConfirm={() => {
                    window.setTimeout(() => setOpen(false), 0);
                }}
            >
                <PartyEventRegister />
            </Modal>
        </>
    );
}
