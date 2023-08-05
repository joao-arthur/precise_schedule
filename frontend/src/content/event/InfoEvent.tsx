import type { Event } from "@/features/event/event";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useDeleteEvent } from "@/features/event/useEventAPI";
import { Modal } from "@/components/molecules/Modal";

type props = {
    readonly event: Event;
    readonly onCancel: () => void;
};

export function InfoEvent({ event, onCancel }: props) {
    const { isSuccess, mutate } = useDeleteEvent();
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
            title={event.name.toLocaleUpperCase()}
            onCancel={onCancel}
            onConfirm={() => mutate(event.id)}
        >
            <div>A ring ding ding ding d-ding baa aramba baa baa barooumba</div>
        </Modal>
    );
}
