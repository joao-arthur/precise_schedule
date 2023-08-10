import type { BirthdayEvent } from "@/features/event/event";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useCreateBirthday } from "@/features/event/useEventAPI";
import { BirthdayForm } from "./BirthdayForm";

type props = {
    readonly event?: Partial<BirthdayEvent>;
    readonly onClose: () => void;
};

export function BirthdayCreate({ event, onClose }: props) {
    const { mutate, isLoading, isSuccess } = useCreateBirthday();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (isSuccess) {
            onClose();
            queryClient.invalidateQueries("event/find");
        }
    }, [queryClient, isSuccess, onClose]);

    return <BirthdayForm event={event} disabled={isLoading} onSubmit={(data) => mutate(data)} />;
}
