import type { Meeting } from "frontend_core";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useCreateMeeting } from "@/features/event/useEventAPI";
import { MeetingForm } from "./MeetingForm";

type props = {
    readonly event?: Partial<Meeting>;
    readonly onClose: () => void;
};

export function MeetingCreate({ event, onClose }: props) {
    const { mutate, isLoading, isSuccess } = useCreateMeeting();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (isSuccess) {
            onClose();
            queryClient.invalidateQueries("event/find");
        }
    }, [queryClient, isSuccess, onClose]);

    return <MeetingForm event={event} disabled={isLoading} onSubmit={(data) => mutate(data)} />;
}
