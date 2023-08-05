import type { PartyEvent } from "@/features/event/event";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useCreateParty } from "@/features/event/useEventAPI";
import { Modal } from "@/components/molecules/Modal";
import { PartyEventRegister } from "@/content/event/PartyEventRegister";
import { Action } from "./Action";

export function PartyAction() {
    const [open, setOpen] = useState(false);
    const { mutate, isLoading, isSuccess } = useCreateParty();
    const queryClient = useQueryClient();

    function submit(data: PartyEvent) {
        mutate(data);
    }

    useEffect(() => {
        if (isSuccess) {
            setOpen(false);
            queryClient.invalidateQueries("event/find");
        }
    }, [isSuccess]);

    return (
        <>
            <Action
                title="PARTY"
                icon="party"
                onClick={() => setOpen(!open)}
            />
            <Modal
                title="NEW PARTY"
                visible={open}
                formId="PartyEventRegister"
                onCancel={() => setOpen(false)}
                confirmLabel="SAVE"
            >
                <PartyEventRegister onSubmit={submit} isLoading={isLoading} />
            </Modal>
        </>
    );
}
