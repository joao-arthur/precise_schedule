import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useCreateDate } from "@/features/event/useEventAPI";
import { DateForm } from "./DateForm";

type props = {
    readonly onClose: () => void;
};

export function DateCreate({ onClose }: props) {
    const { mutate, isLoading, isSuccess } = useCreateDate();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (isSuccess) {
            onClose();
            queryClient.invalidateQueries("event/find");
        }
    }, [queryClient, isSuccess, onClose]);

    return <DateForm disabled={isLoading} onSubmit={(data) => mutate(data)} />;
}
