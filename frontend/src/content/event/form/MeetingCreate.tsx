import type { Meeting } from "frontend_core";
import { meetingEventFns } from "frontend_core";
import { useEvent } from "@/features/event/useEvent";
import { MeetingForm } from "./MeetingForm";

type props = {
    readonly event?: Partial<Meeting>;
    readonly onClose: () => void;
};

export function MeetingCreate({ event, onClose }: props) {
    const { add } = useEvent();

    function handleSubmit(event: Meeting) {
        add(meetingEventFns.toEvent(event));
        onClose();
    }

    return <MeetingForm event={event} disabled={false} onSubmit={handleSubmit} />;
}
