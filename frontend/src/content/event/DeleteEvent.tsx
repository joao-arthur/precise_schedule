import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { Modal } from "@/components/modal/Modal";
import { Text } from "@/components/atoms/Text";
import { eventType } from "../../eventType";
import { useEventAPI } from "../../eventAPI";

type props = {
    readonly event: eventType;
    readonly visible: boolean;
    readonly hide: () => void;
};

export function DeleteEvent(
    { event, visible, hide }: props,
) {
    const { useDeleteEvent } = useEventAPI();
    const { isSuccess, mutate } = useDeleteEvent(event);
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
            title={`delete "${event.name}"`}
            onCancel={hide}
            onConfirm={mutate}
        >
            <Text>This action can't be undone, are you sure?</Text>
        </Modal>
    );
}
