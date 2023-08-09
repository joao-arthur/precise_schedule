import type { AppointmentEvent } from "@/features/event/event";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useUpdateAppointment } from "@/features/event/useEventAPI";
import { Modal } from "@/components/molecules/Modal";
import { AppointmentForm } from "./AppointmentForm";

type props = {
    readonly event: AppointmentEvent;
    readonly onCancel: () => void;
};

export function AppointmentUpdateModal({ event, onCancel }: props) {
    const { mutate, isSuccess, isLoading } = useUpdateAppointment();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (isSuccess) {
            onCancel();
            queryClient.invalidateQueries("getEvents");
        }
    }, [queryClient, isSuccess, onCancel]);

    return (
        <Modal
            visible
            title={`EDIT "${event.name.toLocaleUpperCase()}"`}
            onCancel={onCancel}
            formId="AppointmentForm"
            confirmLabel="SAVE"
        >
            <AppointmentForm event={event} disabled={isLoading} onSubmit={(data) => mutate(data)} />
        </Modal>
    );
}
