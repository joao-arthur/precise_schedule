import type { Event } from "@/features/event/event";
import { AppointmentUpdate } from "./form/AppointmentUpdate";
import { BirthdayUpdate } from "./form/BirthdayUpdate";
import { DateUpdate } from "./form/DateUpdate";
import { MeetingUpdate } from "./form/MeetingUpdate";
import { PartyUpdate } from "./form/PartyUpdate";

type props = {
    readonly event: Event;
    readonly onClose: () => void;
};

export function UpdateEventBuilder({ event, onClose }: props) {
    switch (event.category) {
        case "APPOINTMENT":
            return <AppointmentUpdate event={event} onClose={onClose} />;
        case "BIRTHDAY":
            return <BirthdayUpdate event={event} onClose={onClose} />;
        case "DATE":
            return <DateUpdate event={event} onClose={onClose} />;
        case "MEETING":
            return <MeetingUpdate event={event} onClose={onClose} />;
        case "PARTY":
            return <PartyUpdate event={event} onClose={onClose} />;
    }
}
