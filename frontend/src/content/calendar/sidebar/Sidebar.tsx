import { useEffect, useRef, useState } from "react";
import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";
import clss from "classnames";
import { dateFns } from "frontend_core";
import { useDevice } from "@/lib/device/useDevice";
import { useCalendar } from "@/features/calendar/useCalendar";
import { ButtonIcon } from "@/components/atoms/ButtonIcon";
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
    const { selectedDay, removeSelectedDate } = useCalendar();
    const [displayDay, setDisplayDay] = useState(selectedDay);
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
        if (selectedDay) {
            setDisplayDay(selectedDay);
            if (state.value !== "opened") send("open");
        } else send("close");
    }, [selectedDay]);

    return (
        <div
            className={clss(
                "z-10",
                "flex overflow-hidden flex-0-auto",
                "bg-white dark:bg-dark-light",
                "transition-all duration-500",
                {
                    "w-100 border-l border-gray-300 dark:border-gray-500": selectedDay &&
                        !isMobile,
                    "w-screen": selectedDay && isMobile,
                    "w-0": !selectedDay,
                },
            )}
        >
            <div
                className={clss(
                    "flex flex-0",
                    isMobile ? "w-screen" : "w-100",
                )}
            >
                {displayDay
                    ? (
                        <div
                            className={clss(
                                "flex flex-col flex-1",
                                isMobile ? "w-screen" : "w-100",
                            )}
                        >
                            <div
                                className={clss(
                                    "flex justify-between m-1 border-b",
                                    "items-center px-5 py-4",
                                    "border-gray-300 dark:border-gray-500",
                                    "transition-colors duration-500",
                                )}
                            >
                                <div className="text-center">
                                    <Text size="3xl">
                                        {dateFns.formatDate(
                                            displayDay,
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
                            <Events date={displayDay} />
                        </div>
                    )
                    : null}
            </div>
        </div>
    );
}
