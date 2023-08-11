import type { Date } from "frontend_core";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useUpdateDate } from "@/features/event/useEventAPI";
import { DateForm } from "./DateForm";

type props = {
    readonly event: Date;
    readonly onClose: () => void;
};

export function DateUpdate({ event, onClose }: props) {
    const { mutate, isSuccess, isLoading } = useUpdateDate();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (isSuccess) {
            onClose();
            queryClient.invalidateQueries("event/find");
        }
    }, [queryClient, isSuccess, onClose]);

    return <DateForm event={event} disabled={isLoading} onSubmit={(data) => mutate(data)} />;
}
