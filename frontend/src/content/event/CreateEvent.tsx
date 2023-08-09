import type { Event } from "@/features/event/event";
import { Modal } from "@/components/molecules/Modal";
import { CreateEventBuilder } from "./CreateEventBuilder";
import { getFormName } from "./form/getFormName";

type props = {
    readonly category: Event["category"];
    readonly visible: boolean;
    readonly onClose: () => void;
};

export function CreateEvent({ category, visible, onClose }: props) {
    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            title={`NEW ${category}`}
            formId={getFormName(category)}
            confirmLabel="SAVE"
        >
            <CreateEventBuilder category={category} onClose={onClose} />
        </Modal>
    );
}
