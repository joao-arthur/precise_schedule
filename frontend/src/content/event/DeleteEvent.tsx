import type { Event } from "@/features/event/event";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useDeleteEvent } from "@/features/event/useEventAPI";
import { Text } from "@/components/atoms/Text";
import { Modal } from "@/components/molecules/Modal";

type props = {
    readonly event: Event;
    readonly onCancel: () => void;
};

export function DeleteEvent({ event, onCancel }: props) {
    const { isSuccess, mutate } = useDeleteEvent();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (isSuccess) {
            onCancel();
            queryClient.invalidateQueries("event/find");
        }
    }, [queryClient, isSuccess, onCancel]);

    return (
        <Modal
            visible
            onCancel={onCancel}
            title={`DELETE "${event.name.toLocaleUpperCase()}"`}
            onConfirm={() => mutate(event.id)}
        >
            <div className="py-5">
                <Text>This action can't be undone, are you sure?</Text>
            </div>
        </Modal>
    );
}
