import type { DateEvent } from "@/features/event/event";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useUpdateDate } from "@/features/event/useEventAPI";
import { Modal } from "@/components/molecules/Modal";
import { DateForm } from "./DateForm";

type props = {
    readonly event: DateEvent;
    readonly onCancel: () => void;
};

export function DateUpdateModal({ event, onCancel }: props) {
    const { mutate, isSuccess, isLoading } = useUpdateDate();
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
            formId="DateForm"
            confirmLabel="SAVE"
        >
            <DateForm event={event} disabled={isLoading} onSubmit={(data) => mutate(data)} />
        </Modal>
    );
}
