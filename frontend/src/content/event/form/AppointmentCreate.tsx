import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useCreateAppointment } from "@/features/event/useEventAPI";
import { AppointmentForm } from "./AppointmentForm";

type props = {
    readonly onClose: () => void;
};

export function AppointmentCreate({ onClose }: props) {
    const { mutate, isLoading, isSuccess } = useCreateAppointment();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (isSuccess) {
            onClose();
            queryClient.invalidateQueries("event/find");
        }
    }, [queryClient, isSuccess, onClose]);

    return <AppointmentForm disabled={isLoading} onSubmit={(data) => mutate(data)} />;
}
