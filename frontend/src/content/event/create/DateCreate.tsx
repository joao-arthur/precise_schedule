import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useCreateDate } from "@/features/event/useEventAPI";
import { Modal } from "@/components/molecules/Modal";
import { DateForm } from "../form/DateForm";

type props = {
    readonly open: boolean;
    readonly onCancel: () => void;
};

export function DateCreate({ open, onCancel }: props) {
    const { mutate, isLoading, isSuccess } = useCreateDate();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (isSuccess) {
            onCancel();
            queryClient.invalidateQueries("event/find");
        }
    }, [isSuccess]);

    return (
        <Modal
            title="NEW DATE"
            visible={open}
            formId="DateForm"
            onCancel={onCancel}
            confirmLabel="SAVE"
        >
            <DateForm disabled={isLoading} onSubmit={(data) => mutate(data)} />
        </Modal>
    );
}
