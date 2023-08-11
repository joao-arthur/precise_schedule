import type { Event } from "frontend_core";
import { Modal } from "@/components/molecules/Modal";
import { InfoEventBuilder } from "./InfoEventBuilder";

type props = {
    readonly event: Event;
    readonly onClose: () => void;
};

export function InfoEvent({ event, onClose }: props) {
    return (
        <Modal
            visible
            onCancel={onClose}
            title={event.name.toLocaleUpperCase()}
            hideConfirm
        >
            <InfoEventBuilder event={event} />
        </Modal>
    );
}
