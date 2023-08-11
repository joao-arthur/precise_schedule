import type { Event } from "frontend_core";
import { Modal } from "@/components/molecules/Modal";
import { UpdateEventBuilder } from "./UpdateEventBuilder";
import { getFormName } from "./form/getFormName";

type props = {
    readonly event: Event;
    readonly onClose: () => void;
};

export function UpdateEvent({ event, onClose }: props) {
    return (
        <Modal
            visible
            onCancel={onClose}
            title={`EDIT "${event.name.toLocaleUpperCase()}"`}
            formId={getFormName(event.category)}
            confirmLabel="SAVE"
        >
            <UpdateEventBuilder event={event} onClose={onClose} />
        </Modal>
    );
}
