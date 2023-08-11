import type { Event } from "frontend_core";
import { Modal } from "@/components/molecules/Modal";
import { CreateEventBuilder } from "./CreateEventBuilder";
import { getFormName } from "./form/getFormName";

type props = {
    readonly event: Partial<Event>;
    readonly visible: boolean;
    readonly onClose: () => void;
};

export function CreateEvent({ event, visible, onClose }: props) {
    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            title={`NEW ${event.category}`}
            formId={getFormName(event.category!)}
            confirmLabel="SAVE"
        >
            <CreateEventBuilder event={event} onClose={onClose} />
        </Modal>
    );
}
