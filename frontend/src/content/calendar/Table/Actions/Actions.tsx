import { FloatingButton } from "@/components/atoms/button/FloatingButton";
import { Action } from "./Action";
import { If } from "@/components/atoms/layout/If";
import { useState } from "react";

export function Actions() {
    const [open, setOpen] = useState(false);

    return (
        <div className="absolute right-12 bottom-16">
            <div className="flex flex-col items-center gap-4">
                <If condition={open}>
                    <div className="flex flex-col items-end gap-4">
                        <Action title="APPOINTMENT" icon="pencil" />
                        <Action title="BIRTHDAY" icon="birthday" />
                        <Action title="DATE" icon="people" />
                        <Action title="MEETING" icon="door" />
                        <Action title="PARTY" icon="party" />
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
