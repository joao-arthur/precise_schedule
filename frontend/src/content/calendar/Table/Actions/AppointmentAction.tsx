import { Action } from "./Action";
import { useState } from "react";
import { Modal } from "@/content/modal/Modal";
import AppointmentEventRegister from "@/content/event/AppointmentEventRegister";

export function AppointmentAction() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Action
                title="APPOINTMENT"
                icon="pencil"
                onClick={() => {
                    setOpen(!open);
                }}
            />
            <Modal
                title="NEW APPOINTMENT"
                visible={open}
                formId="AppointmentEventRegister"
                onCancel={() => {
                    setOpen(false);
                }}
                onConfirm={() => {
                    window.setTimeout(() => setOpen(false), 0);
                }}
            >
                <AppointmentEventRegister />
            </Modal>
        </>
    );
}
