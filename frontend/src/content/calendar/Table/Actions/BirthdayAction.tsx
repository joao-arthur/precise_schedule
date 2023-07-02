import { Action } from "./Action";
import { useState } from "react";
import { Modal } from "@/content/modal/Modal";
import BirthdayEventRegister from "@/pages/birthdayevent";

export function BirthdayAction() {
    const [openBirthday, setOpenBirthday] = useState(false);

    return (
        <>
            <Action
                title="BIRTHDAY"
                icon="birthday"
                onClick={() => {
                    setOpenBirthday(!openBirthday);
                }}
            />
            <Modal
                title="birthday"
                visible={openBirthday}
                onCancel={() => {
                    setOpenBirthday(false);
                }}
                onConfirm={() => {
                    setOpenBirthday(false);
                }}
            >
                <BirthdayEventRegister />
            </Modal>
        </>
    );
}
