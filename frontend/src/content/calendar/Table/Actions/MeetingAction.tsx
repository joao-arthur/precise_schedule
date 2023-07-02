import { Action } from "./Action";
import { useState } from "react";
import { Modal } from "@/content/modal/Modal";
import MeetingEventRegister from "@/content/event/MeetingEventRegister";

export function MeetingAction() {
    const [openMeeting, setOpenMeeting] = useState(false);

    return (
        <>
            <Action
                title="MEETING"
                icon="door"
                onClick={() => {
                    setOpenMeeting(!openMeeting);
                }}
            />
            <Modal
                title="NEW MEETING"
                visible={openMeeting}
                onCancel={() => {
                    setOpenMeeting(false);
                }}
                onConfirm={() => {
                    setOpenMeeting(false);
                }}
            >
                <MeetingEventRegister />
            </Modal>
        </>
    );
}
