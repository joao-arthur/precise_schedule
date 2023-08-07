import { useEffect, useRef, useState } from "react";
import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";
import { dateFns } from "frontend_core";
import { cl } from "@/lib/cl";
import { useDevice } from "@/lib/device/useDevice";
import { useCalendar } from "@/features/calendar/useCalendar";
import { useCalendarEvent } from "@/features/calendarEvent/useCalendarEvent";
import { Text } from "@/components/atoms/Text";
import { Button } from "@/components/atoms/button/Button";
import { ButtonIcon } from "@/components/molecules/ButtonIcon";
import { Item } from "./Item";
import { NewDateModal } from "@/content/event/NewDateModal";

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
    const { getDateEvents } = useCalendarEvent();
    const [displayDate, setDisplayDay] = useState(selectedDate);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        switch (state.value) {
            case "opened":
                window.clearTimeout(timeoutId.current);
                break;
            case "closing":
                timeoutId.current = window.setTimeout(
                    () => send("close"),
                    600,
                );
                break;
            case "closed":
                setDisplayDay(undefined);
                break;
        }
    }, [state]);

    useEffect(() => {
        if (selectedDate) {
            setDisplayDay(selectedDate);
            if (state.value !== "opened") send("open");
        } else send("close");
    }, [selectedDate]);

    return (
        <div
            className={cl(
                "z-10",
                "flex overflow-hidden flex-0-auto",
                "bg-white dark:bg-dark-light",
                "transition-all duration-300",
                {
                    "w-100 border-l border-gray-300 dark:border-gray-500": selectedDate &&
                        !isMobile,
                    "w-screen": selectedDate && isMobile,
                    "w-0": !selectedDate,
                },
            )}
        >
            <div
                className={cl(
                    "flex flex-0",
                    isMobile ? "w-screen" : "w-100",
                )}
            >
                {displayDate
                    ? (
                        <div
                            className={cl(
                                "flex flex-col flex-1",
                                isMobile ? "w-screen" : "w-100",
                            )}
                        >
                            <div
                                className={cl(
                                    "flex justify-between items-center",
                                    "px-5 py-4",
                                    "border-b border-gray-300 dark:border-gray-500",
                                    "transition-colors duration-300",
                                )}
                            >
                                <div className="text-center">
                                    <Text size="3xl">
                                        {dateFns.formatDate(
                                            displayDate,
                                            window.navigator.language,
                                        )}
                                    </Text>
                                </div>
                                <ButtonIcon
                                    icon="x"
                                    size="big"
                                    onClick={() => removeSelectedDate()}
                                />
                            </div>
                            <div
                                className={cl("flex-1 m-1", {
                                    "w-screen": isMobile,
                                })}
                            >
                                {getDateEvents(displayDate).map((evt) => (
                                    <Item key={evt} evt={evt} />
                                ))}
                            </div>
                            <div className="p-4 border-t border-gray-300 dark:border-gray-500">
                                <Button onClick={() => setOpen(!open)}>NEW EVENT</Button>
                            </div>
                            <NewDateModal open={open} close={() => setOpen(false)} />
                        </div>
                    )
                    : null}
            </div>
        </div>
    );
}
