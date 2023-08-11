import type { Appointment } from "frontend_core";
import { appointmentEventFns } from "frontend_core";
import { useEvent } from "@/features/event/useEvent";
import { AppointmentForm } from "./AppointmentForm";

type props = {
    readonly event: Appointment;
    readonly onClose: () => void;
};

export function AppointmentUpdate({ event, onClose }: props) {
    const { update } = useEvent();

    function handleSubmit(event: Appointment) {
        update(appointmentEventFns.toEvent(event));
        onClose();
    }

    return <AppointmentForm event={event} disabled={false} onSubmit={handleSubmit} />;
}
