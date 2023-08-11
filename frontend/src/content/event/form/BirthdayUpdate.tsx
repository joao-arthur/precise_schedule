import type { Birthday } from "frontend_core";
import { birthdayEventFns } from "frontend_core";
import { useEvent } from "@/features/event/useEvent";
import { BirthdayForm } from "./BirthdayForm";

type props = {
    readonly event: Birthday;
    readonly onClose: () => void;
};

export function BirthdayUpdate({ event, onClose }: props) {
    const { update } = useEvent();

    function handleSubmit(event: Birthday) {
        update(birthdayEventFns.toEvent(event));
        onClose();
    }

    return <BirthdayForm event={event} disabled={false} onSubmit={handleSubmit} />;
}
