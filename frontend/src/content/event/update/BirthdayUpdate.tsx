import type { BirthdayEvent } from "@/features/event/event";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useUpdateBirthday } from "@/features/event/useEventAPI";
import { Modal } from "@/components/molecules/Modal";
import { BirthdayForm } from "../form/BirthdayForm";

type props = {
    readonly event: BirthdayEvent;
    readonly onCancel: () => void;
};

export function BirthdayUpdate({ event, onCancel }: props) {
    const { mutate, isSuccess, isLoading } = useUpdateBirthday();
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
            formId="BirthdayForm"
            confirmLabel="SAVE"
        >
            <BirthdayForm event={event} disabled={isLoading} onSubmit={(data) => mutate(data)} />
        </Modal>
    );
}
