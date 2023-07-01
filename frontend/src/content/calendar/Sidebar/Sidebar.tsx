import { useEffect, useRef, useState } from "react";
import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";
import classNames from "classnames";
import { useDevice } from "@/lib/device/useDevice";
import { useCalendar } from "@/features/calendar/useCalendar";
import { ButtonIcon } from "@/components/atoms/ButtonIcon";
import { Text } from "@/components/atoms/typography/Text";
import { If } from "@/components/atoms/layout/If";
import { Events } from "./Events";
import { Footer } from "./Footer";

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
    const device = useDevice();
    const isMobile = device.isMobile();
    const isDesktop = device.isDesktop();

    const { selectedDate, removeSelectedDate } = useCalendar();

    const [displayDay, setDisplayDay] = useState(selectedDate);
    const displayDayDate = new Date(displayDay);
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
                setDisplayDay("");
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
            className={classNames(
                "flex overflow-hidden flex-0-auto bg-white dark:bg-dark-light transition-all duration-500",
                {
                    "w-100 border-l border-gray-300 dark:border-gray-500":
                        selectedDate && isDesktop,
                    "w-screen": selectedDate && isMobile,
                    "w-0": !selectedDate,
                },
            )}
        >
            <div
                className={classNames(
                    "flex flex-0",
                    isMobile ? "w-screen" : "w-100",
                )}
            >
                <If condition={!!displayDay}>
                    <div
                        className={classNames(
                            "flex flex-col flex-1",
                            isMobile ? "w-screen" : "w-100",
                        )}
                    >
                        <div className="flex justify-between m-1 border-b border-gray-300 dark:border-gray-500 transition-colors duration-500">
                            <Text className="text-center p-4 my-auto text-3xl">
                                {displayDayDate
                                    .toLocaleDateString()}
                            </Text>
                            <ButtonIcon
                                name="close"
                                type="big"
                                onClick={() => removeSelectedDate()}
                            />
                        </div>
                        <Events day={displayDayDate} />
                        <Footer day={displayDayDate} />
                    </div>
                </If>
            </div>
        </div>
    );
}
