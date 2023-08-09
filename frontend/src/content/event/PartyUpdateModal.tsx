import type { PartyEvent } from "@/features/event/event";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useUpdateParty } from "@/features/event/useEventAPI";
import { Modal } from "@/components/molecules/Modal";
import { PartyForm } from "./PartyForm";

type props = {
    readonly event: PartyEvent;
    readonly onCancel: () => void;
};

export function PartyUpdateModal({ event, onCancel }: props) {
    const { mutate, isSuccess, isLoading } = useUpdateParty();
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
            formId="PartyForm"
            confirmLabel="SAVE"
        >
            <PartyForm event={event} disabled={isLoading} onSubmit={(data) => mutate(data)} />
        </Modal>
    );
}
