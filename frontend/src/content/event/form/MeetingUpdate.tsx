import type { Meeting } from "frontend_core";
import { meetingEventFns } from "frontend_core";
import { useEvent } from "@/features/event/useEvent";
import { MeetingForm } from "./MeetingForm";

type props = {
    readonly event: Meeting;
    readonly onClose: () => void;
};

export function MeetingUpdate({ event, onClose }: props) {
    const { update } = useEvent();

    function handleSubmit(event: Meeting) {
        update(meetingEventFns.toEvent(event));
        onClose();
    }

    return <MeetingForm event={event} disabled={false} onSubmit={handleSubmit} />;
}
