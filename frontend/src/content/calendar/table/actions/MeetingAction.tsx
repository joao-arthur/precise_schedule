import { Action } from "./Action";
import { useState } from "react";
import { Modal } from "@/content/modal/Modal";
import MeetingEventRegister from "@/content/event/MeetingEventRegister";

export function MeetingAction() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Action
                title="MEETING"
                icon="door"
                onClick={() => {
                    setOpen(!open);
                }}
            />
            <Modal
                title="NEW MEETING"
                visible={open}
                formId="MeetingEventRegister"
                onCancel={() => {
                    setOpen(false);
                }}
                onConfirm={() => {
                    window.setTimeout(() => setOpen(false), 0);
                }}
            >
                <MeetingEventRegister />
            </Modal>
        </>
    );
}
