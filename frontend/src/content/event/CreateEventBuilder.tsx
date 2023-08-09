import type { Event } from "@/features/event/event";
import { AppointmentCreate } from "./form/AppointmentCreate";
import { BirthdayCreate } from "./form/BirthdayCreate";
import { DateCreate } from "./form/DateCreate";
import { MeetingCreate } from "./form/MeetingCreate";
import { PartyCreate } from "./form/PartyCreate";

type props = {
    readonly category: Event["category"];
    readonly onClose: () => void;
};

export function CreateEventBuilder({ category, onClose }: props) {
    switch (category) {
        case "APPOINTMENT":
            return <AppointmentCreate onClose={onClose} />;
        case "BIRTHDAY":
            return <BirthdayCreate onClose={onClose} />;
        case "DATE":
            return <DateCreate onClose={onClose} />;
        case "MEETING":
            return <MeetingCreate onClose={onClose} />;
        case "PARTY":
            return <PartyCreate onClose={onClose} />;
    }
}
