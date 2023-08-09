import { useEffect, useRef, useState } from "react";
import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";
import { cl } from "@/lib/cl";
import { useDevice } from "@/lib/device/useDevice";
import { useCalendar } from "@/features/calendar/useCalendar";
import { SidebarContent } from "./SidebarContent";

const sidebarMachine = createMachine({
    predictableActionArguments: true,
    id: "sidebar",
    initial: "closed",
    states: {
        opened: {
            on: { close: "closing" },
        },
        closing: {
            on: { open: "opened", close: "closed" },
        },
        closed: {
            on: { open: "opened" },
        },
    },
});

export function Sidebar() {
    const [state, send] = useMachine(sidebarMachine);
    const isMobile = useDevice().isMobile();
    const { selectedDate, removeSelectedDate } = useCalendar();
    const timeoutId = useRef(-1);
    const [date, setDate] = useState(selectedDate);

    useEffect(() => {
        switch (state.value) {
            case "opened":
                window.clearTimeout(timeoutId.current);
                break;
            case "closing":
                timeoutId.current = window.setTimeout(
                    () => send("close"),
                    150,
                );
                break;
            case "closed":
                setDate(undefined);
                break;
        }
    }, [state]);

    useEffect(() => {
        if (selectedDate) {
            setDate(selectedDate);
            if (state.value !== "opened") send("open");
        } else send("close");
    }, [selectedDate]);

    return (
        <div
            className={cl(
                "z-10",
                "flex overflow-hidden flex-0-auto",
                "bg-gray-100 dark:bg-drk-dk2",
                "transition-all duration-100",
                {
                    "w-100 border-l border-gray-300 dark:border-gray-500": selectedDate &&
                        !isMobile,
                    "w-screen": selectedDate && isMobile,
                    "w-0": !selectedDate,
                },
            )}
        >
            <div
                className={cl("flex flex-0", isMobile ? "w-screen" : "w-100")}
            >
                {date ? <SidebarContent date={date} close={() => removeSelectedDate()} /> : null}
            </div>
        </div>
    );
}
