import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useCreateBirthday } from "@/features/event/useEventAPI";
import { Modal } from "@/components/molecules/Modal";
import { BirthdayForm } from "./BirthdayForm";

type props = {
    readonly open: boolean;
    readonly onCancel: () => void;
};

export function BirthdayCreateModal({ open, onCancel }: props) {
    const { mutate, isLoading, isSuccess } = useCreateBirthday();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (isSuccess) {
            onCancel();
            queryClient.invalidateQueries("event/find");
        }
    }, [isSuccess]);

    return (
        <Modal
            title="NEW BIRTHDAY"
            visible={open}
            formId="BirthdayForm"
            onCancel={onCancel}
            confirmLabel="SAVE"
        >
            <BirthdayForm disabled={isLoading} onSubmit={(data) => mutate(data)} />
        </Modal>
    );
}
