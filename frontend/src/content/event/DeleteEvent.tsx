import type { Event } from "frontend_core";
import { Text } from "@/components/atoms/Text";
import { Modal } from "@/components/molecules/Modal";
import { useEvent } from "@/features/event/useEvent";

type props = {
    readonly event: Event;
    readonly onCancel: () => void;
};

export function DeleteEvent({ event, onCancel }: props) {
    const { remove } = useEvent();

    function handleDelete() {
        remove(event.id);
        onCancel();
    }

    return (
        <Modal
            visible
            onCancel={onCancel}
            title={`DELETE "${event.name.toLocaleUpperCase()}"`}
            onConfirm={handleDelete}
        >
            <div className="py-5">
                <Text>This action can't be undone, are you sure?</Text>
            </div>
        </Modal>
    );
}
