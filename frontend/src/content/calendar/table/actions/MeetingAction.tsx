import type { MeetingEvent } from "@/features/event/event";
import { useEffect, useState } from "react";
import { useCreateMeeting } from "@/features/event/useEventAPI";
import { Modal } from "@/content/modal/Modal";
import { MeetingEventRegister } from "@/content/event/MeetingEventRegister";
import { Action } from "./Action";

export function MeetingAction() {
    const [open, setOpen] = useState(false);
    const { mutate, isLoading, isSuccess } = useCreateMeeting();

    function submit(data: MeetingEvent) {
        mutate(data);
    }

    useEffect(() => {
        if (isSuccess) {
            setOpen(false);
        }
    }, [isSuccess]);

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
            >
                <MeetingEventRegister onSubmit={submit} isLoading={isLoading} />
            </Modal>
        </>
    );
}
