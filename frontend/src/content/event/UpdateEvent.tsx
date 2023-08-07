import type { Event } from "@/features/event/event";
import { AppointmentUpdateModal } from "./AppointmentUpdateModal";
import { BirthdayUpdateModal } from "./BirthdayUpdateModal";
import { DateUpdateModal } from "./DateUpdateModal";
import { MeetingUpdateModal } from "./MeetingUpdateModal";
import { PartyUpdateModal } from "./PartyUpdateModal";

type props = {
    readonly event: Event;
    readonly onCancel: () => void;
};

export function UpdateEvent({ event, onCancel }: props) {
    switch (event.category) {
        case "APPOINTMENT":
            return <AppointmentUpdateModal event={event} onCancel={onCancel} />;
        case "BIRTHDAY":
            return <BirthdayUpdateModal event={event} onCancel={onCancel} />;
        case "DATE":
            return <DateUpdateModal event={event} onCancel={onCancel} />;
        case "MEETING":
            return <MeetingUpdateModal event={event} onCancel={onCancel} />;
        case "PARTY":
            return <PartyUpdateModal event={event} onCancel={onCancel} />;
    }
}
