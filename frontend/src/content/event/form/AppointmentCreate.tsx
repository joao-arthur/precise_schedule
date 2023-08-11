import type { Appointment } from "frontend_core";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useCreateAppointment } from "@/features/event/useEventAPI";
import { AppointmentForm } from "./AppointmentForm";

type props = {
    readonly event?: Partial<Appointment>;
    readonly onClose: () => void;
};

export function AppointmentCreate({ event, onClose }: props) {
    const { mutate, isLoading, isSuccess } = useCreateAppointment();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (isSuccess) {
            onClose();
            queryClient.invalidateQueries("event/find");
        }
    }, [queryClient, isSuccess, onClose]);

    return <AppointmentForm event={event} disabled={isLoading} onSubmit={(data) => mutate(data)} />;
}
