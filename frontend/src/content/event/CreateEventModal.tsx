import { Button } from "@/components/atoms/button/Button";
import { Modal } from "@/components/molecules/Modal";
import { AppointmentCreateModal } from "./AppointmentCreateModal";
import { BirthdayCreateModal } from "./BirthdayCreateModal";
import { DateCreateModal } from "./DateCreateModal";
import { MeetingCreateModal } from "./MeetingCreateModal";
import { PartyCreateModal } from "./PartyCreateModal";
import { useState } from "react";

type props = {
    readonly open: boolean;
    readonly onCancel: () => void;
};

export function CreateEventModal({ open, onCancel }: props) {
    const [appointmentOpen, setAppointmentOpen] = useState(false);
    const [birthdayOpen, setBirthdayOpen] = useState(false);
    const [dateOpen, setDateOpen] = useState(false);
    const [meetingOpen, setMeetingOpen] = useState(false);
    const [partyOpen, setPartyOpen] = useState(false);

    return (
        <>
            <Modal
                title="NEW EVENT"
                visible={open}
                formId="DateForm"
                onCancel={onCancel}
                hideConfirm
            >
                <div className="flex flex-col p-5 gap-3">
                    <Button
                        onClick={() => {
                            setAppointmentOpen(true);
                            onCancel();
                        }}
                    >
                        Appointment
                    </Button>
                    <Button
                        onClick={() => {
                            setBirthdayOpen(true);
                            onCancel();
                        }}
                    >
                        Birthday
                    </Button>
                    <Button
                        onClick={() => {
                            setDateOpen(true);
                            onCancel();
                        }}
                    >
                        Date
                    </Button>
                    <Button
                        onClick={() => {
                            setMeetingOpen(true);
                            onCancel();
                        }}
                    >
                        Meeting
                    </Button>
                    <Button
                        onClick={() => {
                            setPartyOpen(true);
                            onCancel();
                        }}
                    >
                        Party
                    </Button>
                </div>
            </Modal>
            <AppointmentCreateModal
                open={appointmentOpen}
                onCancel={() => setAppointmentOpen(false)}
            />
            <BirthdayCreateModal open={birthdayOpen} onCancel={() => setBirthdayOpen(false)} />
            <DateCreateModal open={dateOpen} onCancel={() => setDateOpen(false)} />
            <MeetingCreateModal open={meetingOpen} onCancel={() => setMeetingOpen(false)} />
            <PartyCreateModal open={partyOpen} onCancel={() => setPartyOpen(false)} />
        </>
    );
}
