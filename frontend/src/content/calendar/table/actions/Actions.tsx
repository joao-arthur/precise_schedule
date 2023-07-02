import { FloatingButton } from "@/components/atoms/button/FloatingButton";
import { If } from "@/components/atoms/layout/If";
import { useState } from "react";
import { AppointmentAction } from "./AppointmentAction";
import { BirthdayAction } from "./BirthdayAction";
import { DateAction } from "./DateAction";
import { MeetingAction } from "./MeetingAction";
import { PartyAction } from "./PartyAction";

export function Actions() {
    const [open, setOpen] = useState(false);

    return (
        <div className="absolute right-12 bottom-16">
            <div className="flex flex-col items-center gap-4">
                <If condition={open}>
                    <div className="flex flex-col items-end gap-4">
                        <AppointmentAction />
                        <BirthdayAction />
                        <DateAction />
                        <MeetingAction />
                        <PartyAction />
                    </div>
                </If>
                <div className="flex w-full justify-end">
                    <FloatingButton
                        className="w-20 h-20"
                        icon="plus"
                        onClick={() => {
                            setOpen(!open);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
