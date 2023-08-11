import type { Date } from "frontend_core";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useCreateDate } from "@/features/event/useEventAPI";
import { DateForm } from "./DateForm";

type props = {
    readonly event?: Partial<Date>;
    readonly onClose: () => void;
};

export function DateCreate({ event, onClose }: props) {
    const { mutate, isLoading, isSuccess } = useCreateDate();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (isSuccess) {
            onClose();
            queryClient.invalidateQueries("event/find");
        }
    }, [queryClient, isSuccess, onClose]);

    return <DateForm event={event} disabled={isLoading} onSubmit={(data) => mutate(data)} />;
}
