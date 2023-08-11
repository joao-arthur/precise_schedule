import type { Date } from "frontend_core";
import { dateEventFns } from "frontend_core";
import { useEvent } from "@/features/event/useEvent";
import { DateForm } from "./DateForm";

type props = {
    readonly event?: Partial<Date>;
    readonly onClose: () => void;
};

export function DateCreate({ event, onClose }: props) {
    const { add } = useEvent();

    function handleSubmit(event: Date) {
        add(dateEventFns.toEvent(event));
        onClose();
    }

    return <DateForm event={event} disabled={false} onSubmit={handleSubmit} />;
}
