import type { Event } from "frontend_core";
import { useState } from "react";
import { Button } from "@/components/atoms/button/Button";
import { Icon } from "@/components/atoms/Icon";
import { Modal } from "@/components/molecules/Modal";
import { CreateEvent } from "./CreateEvent";

type props = {
    readonly date: string;
    readonly visible: boolean;
    readonly onClose: () => void;
};

export function CreateEventModal({ date, visible, onClose }: props) {
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
                        <Icon name="appointment" color="white" colorDark="white" />
                        Appointment
                    </Button>
                    <Button
                        onClick={() => {
                            setCategory("BIRTHDAY");
                            onClose();
                        }}
                    >
                        <Icon name="birthday" color="white" colorDark="white" />
                        Birthday
                    </Button>
                    <Button
                        onClick={() => {
                            setCategory("DATE");
                            onClose();
                        }}
                    >
                        <Icon name="date" color="white" colorDark="white" />
                        Date
                    </Button>
                    <Button
                        onClick={() => {
                            setCategory("MEETING");
                            onClose();
                        }}
                    >
                        <Icon name="meeting" color="white" colorDark="white" />
                        Meeting
                    </Button>
                    <Button
                        onClick={() => {
                            setCategory("PARTY");
                            onClose();
                        }}
                    >
                        <Icon name="party" color="white" colorDark="white" />
                        Party
                    </Button>
                </div>
            </Modal>
            {category !== undefined
                ? (
                    <CreateEvent
                        event={{ category, day: date }}
                        visible
                        onClose={() => setCategory(undefined)}
                    />
                )
                : null}
        </>
    );
}
