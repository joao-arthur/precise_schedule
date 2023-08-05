import type { BirthdayEvent } from "@/features/event/event";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useCreateBirthday } from "@/features/event/useEventAPI";
import { Modal } from "@/components/molecules/Modal";
import { BirthdayEventRegister } from "@/content/event/BirthdayEventRegister";
import { Action } from "./Action";

export function BirthdayAction() {
    const [open, setOpen] = useState(false);
    const { mutate, isLoading, isSuccess } = useCreateBirthday();
    const queryClient = useQueryClient();

    function submit(data: BirthdayEvent) {
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
                title="BIRTHDAY"
                icon="birthday"
                onClick={() => {
                    setOpen(!open);
                }}
            />
            <Modal
                title="NEW BIRTHDAY"
                visible={open}
                formId="BirthdayEventRegister"
                onCancel={() => {
                    setOpen(false);
                }}
            >
                <BirthdayEventRegister onSubmit={submit} isLoading={isLoading} />
            </Modal>
        </>
    );
}
