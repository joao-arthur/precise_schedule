import type { Party } from "frontend_core";
import { partyEventFns } from "frontend_core";
import { useEvent } from "@/features/event/useEvent";
import { PartyForm } from "./PartyForm";

type props = {
    readonly event: Party;
    readonly onClose: () => void;
};

export function PartyUpdate({ event, onClose }: props) {
    const { update } = useEvent();

    function handleSubmit(event: Party) {
        update(partyEventFns.toEvent(event));
        onClose();
    }

    return <PartyForm event={event} disabled={false} onSubmit={handleSubmit} />;
}
