import type { Event } from "frontend_core";

export function getFormName(category: Event["category"]) {
    switch (category) {
        case "APPOINTMENT":
            return "AppointmentForm";
        case "BIRTHDAY":
            return "BirthdayForm";
        case "DATE":
            return "DateForm";
        case "MEETING":
            return "MeetingForm";
        case "PARTY":
            return "PartyForm";
    }
}
