import type { PartyEvent } from "@/features/event/event";
import { useEffect, useState } from "react";
import { useCreateParty } from "@/features/event/useEventAPI";
import { Modal } from "@/content/modal/Modal";
import { PartyEventRegister } from "@/content/event/PartyEventRegister";
import { Action } from "./Action";

export function PartyAction() {
    const [open, setOpen] = useState(false);
    const { mutate, isLoading, isSuccess } = useCreateParty();

    function submit(data: PartyEvent) {
        mutate(data);
    }

    useEffect(() => {
        if (isSuccess) {
            setOpen(false);
        }
    }, [isSuccess]);

    return (
        <>
            <Action
                title="PARTY"
                icon="party"
                onClick={() => {
                    setOpen(!open);
                }}
            />
            <Modal
                title="NEW PARTY"
                visible={open}
                formId="PartyEventRegister"
                onCancel={() => {
                    setOpen(false);
                }}
            >
                <PartyEventRegister onSubmit={submit} isLoading={isLoading} />
            </Modal>
        </>
    );
}
