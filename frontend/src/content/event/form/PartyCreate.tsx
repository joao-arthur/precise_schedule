import type { Party } from "frontend_core";
import { partyEventFns } from "frontend_core";
import { useEvent } from "@/features/event/useEvent";
import { PartyForm } from "./PartyForm";

type props = {
    readonly event?: Partial<Party>;
    readonly onClose: () => void;
};

export function PartyCreate({ event, onClose }: props) {
    const { add } = useEvent();

    function handleSubmit(event: Party) {
        add(partyEventFns.toEvent(event));
        onClose();
    }

    return <PartyForm event={event} disabled={false} onSubmit={handleSubmit} />;
}
