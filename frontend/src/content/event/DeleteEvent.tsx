import type { Event } from "@/features/event/event";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useDeleteEvent } from "@/features/event/useEventAPI";
import { Text } from "@/components/atoms/Text";
import { Modal } from "../modal/Modal";

type props = {
    readonly event: Event;
    readonly visible: boolean;
    readonly hide: () => void;
};

export function DeleteEvent({ event, visible, hide }: props) {
    const { isSuccess, mutate } = useDeleteEvent();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (isSuccess) {
            hide();
            queryClient.invalidateQueries("getEvents");
        }
    }, [queryClient, isSuccess, hide]);

    return (
        <Modal
            visible={visible}
            title={`DELETE "${event.name.toLocaleUpperCase()}"`}
            onCancel={hide}
            onConfirm={() => mutate(event.id)}
        >
            <Text>This action can't be undone, are you sure?</Text>
        </Modal>
    );
}
