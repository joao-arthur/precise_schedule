import type { Event } from "@/features/event/event";
import { Modal } from "@/components/molecules/Modal";

type props = {
    readonly event: Event;
    readonly onCancel: () => void;
};

export function InfoEvent({ event, onCancel }: props) {
    return (
        <Modal
            visible
            title={event.name.toLocaleUpperCase()}
            onCancel={onCancel}
            onConfirm={() => mutate(event.id)}
        >
            <div>A ring ding ding ding d-ding baa aramba baa baa barooumba</div>
        </Modal>
    );
}
