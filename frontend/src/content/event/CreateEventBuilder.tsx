import type { Event } from "@/features/event/event";
import { AppointmentCreate } from "./create/AppointmentCreate";
import { BirthdayCreate } from "./create/BirthdayCreate";
import { DateCreate } from "./create/DateCreate";
import { MeetingCreate } from "./create/MeetingCreate";
import { PartyCreate } from "./create/PartyCreate";

type props = {
    readonly category: Event["category"];
    readonly open: boolean;
    readonly onCancel: () => void;
};

export function CreateEventBuilder({ category, open, onCancel }: props) {
    switch (category) {
        case "APPOINTMENT":
            return <AppointmentCreate open={open} onCancel={onCancel} />;
        case "BIRTHDAY":
            return <BirthdayCreate open={open} onCancel={onCancel} />;
        case "DATE":
            return <DateCreate open={open} onCancel={onCancel} />;
        case "MEETING":
            return <MeetingCreate open={open} onCancel={onCancel} />;
        case "PARTY":
            return <PartyCreate open={open} onCancel={onCancel} />;
    }
}
