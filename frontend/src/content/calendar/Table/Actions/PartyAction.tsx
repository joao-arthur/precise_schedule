import { Action } from "./Action";
import { useState } from "react";
import { Modal } from "@/content/modal/Modal";
import PartyEventRegister from "@/content/event/PartyEventRegister";

export function PartyAction() {
    const [openParty, setOpenParty] = useState(false);

    return (
        <>
            <Action
                title="PARTY"
                icon="party"
                onClick={() => {
                    setOpenParty(!openParty);
                }}
            />
            <Modal
                title="NEW PARTY"
                visible={openParty}
                onCancel={() => {
                    setOpenParty(false);
                }}
                onConfirm={() => {
                    setOpenParty(false);
                }}
            >
                <PartyEventRegister />
            </Modal>
        </>
    );
}
