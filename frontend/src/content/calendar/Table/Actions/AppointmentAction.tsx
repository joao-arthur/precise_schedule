import { Action } from "./Action";
import { useState } from "react";
import { Modal } from "@/content/modal/Modal";
import AppointmentEventRegister from "@/pages/appointmentevent";

export function AppointmentAction() {
    const [openAppointment, setOpenAppointment] = useState(false);

    return (
        <>
            <Action
                title="APPOINTMENT"
                icon="pencil"
                onClick={() => {
                    setOpenAppointment(!openAppointment);
                }}
            />
            <Modal
                title="appointment"
                visible={openAppointment}
                onCancel={() => {
                    setOpenAppointment(false);
                }}
                onConfirm={() => {
                    setOpenAppointment(false);
                }}
            >
                <AppointmentEventRegister />
            </Modal>
        </>
    );
}
