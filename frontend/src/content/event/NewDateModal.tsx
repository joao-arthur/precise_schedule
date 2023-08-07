import type { DateEvent } from "@/features/event/event";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useCreateDate } from "@/features/event/useEventAPI";
import { Modal } from "@/components/molecules/Modal";
import { DateNew } from "./DateNew";

type props = {
    readonly open: boolean;
    readonly close: () => void;
};

export function NewDateModal({ open, close }: props) {
    const { mutate, isLoading, isSuccess } = useCreateDate();
    const queryClient = useQueryClient();

    function submit(data: DateEvent) {
        mutate(data);
    }

    useEffect(() => {
        if (isSuccess) {
            close();
            queryClient.invalidateQueries("event/find");
        }
    }, [isSuccess]);

    return (
        <Modal
            title="NEW DATE"
            visible={open}
            formId="DateNew"
            onCancel={() => close()}
            confirmLabel="SAVE"
        >
            <DateNew onSubmit={submit} isLoading={isLoading} />
        </Modal>
    );
}
