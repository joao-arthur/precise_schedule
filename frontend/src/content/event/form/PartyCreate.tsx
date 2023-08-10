import type { PartyEvent } from "@/features/event/event";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useCreateParty } from "@/features/event/useEventAPI";
import { PartyForm } from "./PartyForm";

type props = {
    readonly event?: Partial<PartyEvent>;
    readonly onClose: () => void;
};

export function PartyCreate({ event, onClose }: props) {
    const { mutate, isLoading, isSuccess } = useCreateParty();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (isSuccess) {
            onClose();
            queryClient.invalidateQueries("event/find");
        }
    }, [queryClient, isSuccess, onClose]);

    return <PartyForm event={event} disabled={isLoading} onSubmit={(data) => mutate(data)} />;
}
