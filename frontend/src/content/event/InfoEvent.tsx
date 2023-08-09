import type { Event } from "@/features/event/event";
import { Modal } from "@/components/molecules/Modal";
import { AppointmentForm } from "./form/AppointmentForm";
import { BirthdayForm } from "./form/BirthdayForm";
import { DateForm } from "./form/DateForm";
import { MeetingForm } from "./form/MeetingForm";
import { PartyForm } from "./form/PartyForm";

type props = {
    readonly event: Event;
    readonly onCancel: () => void;
};

export function InfoEvent({ event, onCancel }: props) {
    return (
        <Modal
            visible
            title={event.name.toLocaleUpperCase()}
            onCancel={onCancel}
            hideConfirm
        >
            {event.category === "APPOINTMENT"
                ? <AppointmentForm event={event} disabled />
                : event.category === "BIRTHDAY"
                ? <BirthdayForm event={event} disabled />
                : event.category === "DATE"
                ? <DateForm event={event} disabled />
                : event.category === "MEETING"
                ? <MeetingForm event={event} disabled />
                : event.category === "PARTY"
                ? <PartyForm event={event} disabled />
                : null}
        </Modal>
    );
}
