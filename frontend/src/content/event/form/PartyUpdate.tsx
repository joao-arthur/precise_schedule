import type { Party } from "frontend_core";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useUpdateParty } from "@/features/event/useEventAPI";
import { PartyForm } from "./PartyForm";

type props = {
    readonly event: Party;
    readonly onClose: () => void;
};

export function PartyUpdate({ event, onClose }: props) {
    const { mutate, isSuccess, isLoading } = useUpdateParty();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (isSuccess) {
            onClose();
            queryClient.invalidateQueries("event/find");
        }
    }, [queryClient, isSuccess, onClose]);

    return <PartyForm event={event} disabled={isLoading} onSubmit={(data) => mutate(data)} />;
}
