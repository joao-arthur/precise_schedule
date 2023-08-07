import type { MeetingEvent } from "@/features/event/event";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useUpdateMeeting } from "@/features/event/useEventAPI";
import { Modal } from "@/components/molecules/Modal";
import { MeetingForm } from "./MeetingForm";

type props = {
    readonly event: MeetingEvent;
    readonly onCancel: () => void;
};

export function MeetingUpdateModal({ event, onCancel }: props) {
    const { mutate, isSuccess, isLoading } = useUpdateMeeting();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (isSuccess) {
            onCancel();
            queryClient.invalidateQueries("getEvents");
        }
    }, [queryClient, isSuccess, onCancel]);

    return (
        <Modal visible title={`EDIT "${event.name.toLocaleUpperCase()}"`} onCancel={onCancel}>
            <MeetingForm event={event} disabled={isLoading} onSubmit={mutate} />
        </Modal>
    );
}
