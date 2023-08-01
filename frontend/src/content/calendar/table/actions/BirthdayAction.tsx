import type { BirthdayEvent } from "@/features/event/event";
import { useEffect, useState } from "react";
import { useCreateBirthday } from "@/features/event/useEventAPI";
import { Modal } from "@/content/modal/Modal";
import { BirthdayEventRegister } from "@/content/event/BirthdayEventRegister";
import { Action } from "./Action";

export function BirthdayAction() {
    const [open, setOpen] = useState(false);
    const { mutate, isLoading, isSuccess } = useCreateBirthday();

    function submit(data: BirthdayEvent) {
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
