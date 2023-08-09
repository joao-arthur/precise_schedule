import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useCreateAppointment } from "@/features/event/useEventAPI";
import { Modal } from "@/components/molecules/Modal";
import { AppointmentForm } from "../form/AppointmentForm";

type props = {
    readonly open: boolean;
    readonly onCancel: () => void;
};

export function AppointmentCreate({ open, onCancel }: props) {
    const { mutate, isLoading, isSuccess } = useCreateAppointment();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (isSuccess) {
            onCancel();
            queryClient.invalidateQueries("event/find");
        }
    }, [isSuccess]);

    return (
        <Modal
            title="NEW APPOINTMENT"
            visible={open}
            formId="AppointmentForm"
            onCancel={onCancel}
            confirmLabel="SAVE"
        >
            <AppointmentForm disabled={isLoading} onSubmit={(data) => mutate(data)} />
        </Modal>
    );
}
