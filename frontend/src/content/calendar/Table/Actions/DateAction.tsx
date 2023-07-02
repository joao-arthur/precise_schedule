import { Action } from "./Action";
import { useState } from "react";
import { Modal } from "@/content/modal/Modal";
import DateEventRegister from "@/pages/dateevent";

export function DateAction() {
    const [openDate, setOpenDate] = useState(false);

    return (
        <>
            <Action
                title="DATE"
                icon="people"
                onClick={() => {
                    setOpenDate(!openDate);
                }}
            />
            <Modal
                title="date"
                visible={openDate}
                onCancel={() => {
                    setOpenDate(false);
                }}
                onConfirm={() => {
                    setOpenDate(false);
                }}
            >
                <DateEventRegister />
            </Modal>
        </>
    );
}
