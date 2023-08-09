import type { MeetingEvent } from "@/features/event/event";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useUpdateMeeting } from "@/features/event/useEventAPI";
import { MeetingForm } from "./MeetingForm";

type props = {
    readonly event: MeetingEvent;
    readonly onClose: () => void;
};

export function MeetingUpdate({ event, onClose }: props) {
    const { mutate, isSuccess, isLoading } = useUpdateMeeting();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (isSuccess) {
            onClose();
            queryClient.invalidateQueries("event/find");
        }
    }, [queryClient, isSuccess, onClose]);

    return <MeetingForm event={event} disabled={isLoading} onSubmit={(data) => mutate(data)} />;
}
