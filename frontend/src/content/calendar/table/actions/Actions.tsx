import { useState } from "react";
import { RoundButton } from "@/components/atoms/extraButton/RoundButton";
import { If } from "@/components/atoms/layout/If";
import { Icon } from "@/components/atoms/Icon";
import { AppointmentAction } from "./AppointmentAction";
import { BirthdayAction } from "./BirthdayAction";
import { DateAction } from "./DateAction";
import { MeetingAction } from "./MeetingAction";
import { PartyAction } from "./PartyAction";

export function Actions() {
    const [open, setOpen] = useState(false);

    return (
        <div className="absolute right-12 bottom-16">
            <div className="flex flex-col items-center gap-6">
                <If condition={open}>
                    <div className="flex flex-col items-end gap-5">
                        <AppointmentAction />
                        <BirthdayAction />
                        <DateAction />
                        <MeetingAction />
                        <PartyAction />
                    </div>
                </If>
                <div className="flex w-full justify-end">
                    <RoundButton onClick={() => setOpen(!open)}>
                        <Icon name="+" fill="white" size={20} />
                    </RoundButton>
                </div>
            </div>
        </div>
    );
}
