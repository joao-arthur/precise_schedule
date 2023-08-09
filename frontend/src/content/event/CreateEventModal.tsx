import { useState } from "react";
import { Event } from "@/features/event/event";
import { Button } from "@/components/atoms/button/Button";
import { Modal } from "@/components/molecules/Modal";
import { CreateEvent } from "./CreateEvent";

type props = {
    readonly visible: boolean;
    readonly onClose: () => void;
};

export function CreateEventModal({ visible, onClose }: props) {
    const [category, setCategory] = useState<Event["category"] | undefined>(undefined);

    return (
        <>
            <Modal
                title="NEW EVENT"
                visible={visible}
                formId="DateForm"
                onCancel={onClose}
                hideConfirm
            >
                <div className="flex flex-col p-5 gap-3">
                    <Button
                        onClick={() => {
                            setCategory("APPOINTMENT");
                            onClose();
                        }}
                    >
                        Appointment
                    </Button>
                    <Button
                        onClick={() => {
                            setCategory("BIRTHDAY");
                            onClose();
                        }}
                    >
                        Birthday
                    </Button>
                    <Button
                        onClick={() => {
                            setCategory("DATE");
                            onClose();
                        }}
                    >
                        Date
                    </Button>
                    <Button
                        onClick={() => {
                            setCategory("MEETING");
                            onClose();
                        }}
                    >
                        Meeting
                    </Button>
                    <Button
                        onClick={() => {
                            setCategory("PARTY");
                            onClose();
                        }}
                    >
                        Party
                    </Button>
                </div>
            </Modal>
            {category !== undefined
                ? <CreateEvent category={category} visible onClose={() => setCategory(undefined)} />
                : undefined}
        </>
    );
}
