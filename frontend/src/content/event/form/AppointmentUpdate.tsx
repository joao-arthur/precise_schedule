import type { AppointmentEvent } from "@/features/event/event";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useUpdateAppointment } from "@/features/event/useEventAPI";
import { AppointmentForm } from "./AppointmentForm";

type props = {
    readonly event: AppointmentEvent;
    readonly onClose: () => void;
};

export function AppointmentUpdate({ event, onClose }: props) {
    const { mutate, isSuccess, isLoading } = useUpdateAppointment();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (isSuccess) {
            onClose();
            queryClient.invalidateQueries("event/find");
        }
    }, [queryClient, isSuccess, onClose]);

    return <AppointmentForm event={event} disabled={isLoading} onSubmit={(data) => mutate(data)} />;
}
