import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useCreateBirthday } from "@/features/event/useEventAPI";
import { BirthdayForm } from "./BirthdayForm";

type props = {
    readonly onClose: () => void;
};

export function BirthdayCreate({ onClose }: props) {
    const { mutate, isLoading, isSuccess } = useCreateBirthday();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (isSuccess) {
            onClose();
            queryClient.invalidateQueries("event/find");
        }
    }, [queryClient, isSuccess, onClose]);

    return <BirthdayForm disabled={isLoading} onSubmit={(data) => mutate(data)} />;
}
