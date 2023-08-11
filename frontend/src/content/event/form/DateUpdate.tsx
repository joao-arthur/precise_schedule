import type { Date } from "frontend_core";
import { dateEventFns } from "frontend_core";
import { useEvent } from "@/features/event/useEvent";
import { DateForm } from "./DateForm";

type props = {
    readonly event: Date;
    readonly onClose: () => void;
};

export function DateUpdate({ event, onClose }: props) {
    const { update } = useEvent();

    function handleSubmit(event: Date) {
        update(dateEventFns.toEvent(event));
        onClose();
    }

    return <DateForm event={event} disabled={false} onSubmit={handleSubmit} />;
}
