import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useCreateParty } from "@/features/event/useEventAPI";
import { Modal } from "@/components/molecules/Modal";
import { PartyForm } from "../form/PartyForm";

type props = {
    readonly open: boolean;
    readonly onCancel: () => void;
};

export function PartyCreate({ open, onCancel }: props) {
    const { mutate, isLoading, isSuccess } = useCreateParty();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (isSuccess) {
            onCancel();
            queryClient.invalidateQueries("event/find");
        }
    }, [isSuccess]);

    return (
        <Modal
            title="NEW PARTY"
            visible={open}
            formId="PartyForm"
            onCancel={onCancel}
            confirmLabel="SAVE"
        >
            <PartyForm disabled={isLoading} onSubmit={(data) => mutate(data)} />
        </Modal>
    );
}
