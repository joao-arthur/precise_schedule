import type { Event } from "frontend_core";
import { AppointmentForm } from "./form/AppointmentForm";
import { BirthdayForm } from "./form/BirthdayForm";
import { DateForm } from "./form/DateForm";
import { MeetingForm } from "./form/MeetingForm";
import { PartyForm } from "./form/PartyForm";

type props = {
    readonly event: Event;
};

export function InfoEventBuilder({ event }: props) {
    switch (event.category) {
        case "APPOINTMENT":
            return <AppointmentForm event={event} disabled />;
        case "BIRTHDAY":
            return <BirthdayForm event={event} disabled />;
        case "DATE":
            return <DateForm event={event} disabled />;
        case "MEETING":
            return <MeetingForm event={event} disabled />;
        case "PARTY":
            return <PartyForm event={event} disabled />;
    }
}
