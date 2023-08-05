import { useEffect, useRef, useState } from "react";
import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";
import { cl } from "@/lib/cl";
import { dateFns } from "frontend_core";
import { useDevice } from "@/lib/device/useDevice";
import { useCalendar } from "@/features/calendar/useCalendar";
import { ButtonIcon } from "@/components/molecules/ButtonIcon";
import { Text } from "@/components/atoms/Text";
import { Events } from "./Events";

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
    const isMobile = useDevice().isMobile();
    const { selectedDate, removeSelectedDate } = useCalendar();
    const [displayDate, setDisplayDay] = useState(selectedDate);
    const timeoutId = useRef(-1);
    const [state, send] = useMachine(sidebarMachine);

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
                "transition-all duration-500",
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
                                    "flex justify-between m-1 border-b",
                                    "items-center px-5 py-4",
                                    "border-gray-300 dark:border-gray-500",
                                    "transition-colors duration-500",
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
                                    name="x"
                                    size="big"
                                    onClick={() => removeSelectedDate()}
                                />
                            </div>
                            <Events date={displayDate} />
                        </div>
                    )
                    : null}
            </div>
        </div>
    );
}
