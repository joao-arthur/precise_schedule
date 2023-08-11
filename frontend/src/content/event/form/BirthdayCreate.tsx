import type { Birthday } from "frontend_core";
import { birthdayEventFns } from "frontend_core";
import { useEvent } from "@/features/event/useEvent";
import { BirthdayForm } from "./BirthdayForm";

type props = {
    readonly event?: Partial<Birthday>;
    readonly onClose: () => void;
};

export function BirthdayCreate({ event, onClose }: props) {
    const { add } = useEvent();

    function handleSubmit(event: Birthday) {
        add(birthdayEventFns.toEvent(event));
        onClose();
    }

    return <BirthdayForm event={event} disabled={false} onSubmit={handleSubmit} />;
}
