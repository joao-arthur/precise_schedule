import type { Birthday } from "frontend_core";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useUpdateBirthday } from "@/features/event/useEventAPI";
import { BirthdayForm } from "./BirthdayForm";

type props = {
    readonly event: Birthday;
    readonly onClose: () => void;
};

export function BirthdayUpdate({ event, onClose }: props) {
    const { mutate, isSuccess, isLoading } = useUpdateBirthday();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (isSuccess) {
            onClose();
            queryClient.invalidateQueries("event/find");
        }
    }, [queryClient, isSuccess, onClose]);

    return <BirthdayForm event={event} disabled={isLoading} onSubmit={(data) => mutate(data)} />;
}
