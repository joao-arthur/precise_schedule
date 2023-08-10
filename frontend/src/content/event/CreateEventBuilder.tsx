import type { Event } from "@/features/event/event";
import { AppointmentCreate } from "./form/AppointmentCreate";
import { BirthdayCreate } from "./form/BirthdayCreate";
import { DateCreate } from "./form/DateCreate";
import { MeetingCreate } from "./form/MeetingCreate";
import { PartyCreate } from "./form/PartyCreate";

type props = {
    readonly event: Partial<Event>;
    readonly onClose: () => void;
};

export function CreateEventBuilder({ event, onClose }: props) {
    switch (event.category!) {
        case "APPOINTMENT":
            return <AppointmentCreate event={event} onClose={onClose} />;
        case "BIRTHDAY":
            return <BirthdayCreate event={event} onClose={onClose} />;
        case "DATE":
            return <DateCreate event={event} onClose={onClose} />;
        case "MEETING":
            return <MeetingCreate event={event} onClose={onClose} />;
        case "PARTY":
            return <PartyCreate event={event} onClose={onClose} />;
    }
}
