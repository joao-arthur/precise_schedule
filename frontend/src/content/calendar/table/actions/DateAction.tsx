import type { DateEvent } from "@/features/event/event";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useCreateDate } from "@/features/event/useEventAPI";
import { Modal } from "@/content/modal/Modal";
import { DateEventRegister } from "@/content/event/DateEventRegister";
import { Action } from "./Action";

export function DateAction() {
    const [open, setOpen] = useState(false);
    const { mutate, isLoading, isSuccess } = useCreateDate();
    const queryClient = useQueryClient();

    function submit(data: DateEvent) {
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
                title="DATE"
                icon="people"
                onClick={() => {
                    setOpen(!open);
                }}
            />
            <Modal
                title="NEW DATE"
                visible={open}
                formId="DateEventRegister"
                onCancel={() => {
                    setOpen(false);
                }}
            >
                <DateEventRegister onSubmit={submit} isLoading={isLoading} />
            </Modal>
        </>
    );
}
