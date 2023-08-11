import type { Appointment } from "frontend_core";
import { appointmentEventFns } from "frontend_core";
import { useEvent } from "@/features/event/useEvent";
import { AppointmentForm } from "./AppointmentForm";

type props = {
    readonly event?: Partial<Appointment>;
    readonly onClose: () => void;
};

export function AppointmentCreate({ event, onClose }: props) {
    const { add } = useEvent();

    function handleSubmit(event: Appointment) {
        add(appointmentEventFns.toEvent(event));
        onClose();
    }

    return <AppointmentForm event={event} disabled={false} onSubmit={handleSubmit} />;
}
