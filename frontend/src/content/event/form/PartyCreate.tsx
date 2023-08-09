import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useCreateParty } from "@/features/event/useEventAPI";
import { PartyForm } from "./PartyForm";

type props = {
    readonly onClose: () => void;
};

export function PartyCreate({ onClose }: props) {
    const { mutate, isLoading, isSuccess } = useCreateParty();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (isSuccess) {
            onClose();
            queryClient.invalidateQueries("event/find");
        }
    }, [queryClient, isSuccess, onClose]);

    return <PartyForm disabled={isLoading} onSubmit={(data) => mutate(data)} />;
}
