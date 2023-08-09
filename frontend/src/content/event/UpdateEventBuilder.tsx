import type { Event } from "@/features/event/event";
import { AppointmentUpdate } from "./update/AppointmentUpdate";
import { BirthdayUpdate } from "./update/BirthdayUpdate";
import { DateUpdate } from "./update/DateUpdate";
import { MeetingUpdate } from "./update/MeetingUpdate";
import { PartyUpdate } from "./update/PartyUpdate";

type props = {
    readonly event: Event;
    readonly onCancel: () => void;
};

export function UpdateEventBuilder({ event, onCancel }: props) {
    switch (event.category) {
        case "APPOINTMENT":
            return <AppointmentUpdate event={event} onCancel={onCancel} />;
        case "BIRTHDAY":
            return <BirthdayUpdate event={event} onCancel={onCancel} />;
        case "DATE":
            return <DateUpdate event={event} onCancel={onCancel} />;
        case "MEETING":
            return <MeetingUpdate event={event} onCancel={onCancel} />;
        case "PARTY":
            return <PartyUpdate event={event} onCancel={onCancel} />;
    }
}
