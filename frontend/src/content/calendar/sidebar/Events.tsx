import clss from "classnames";
import { useDevice } from "@/lib/device/useDevice";
import { EventItem } from "./EventItem";
import { useEffect, useState } from "react";
import { EventCalendar, eventFns } from "frontend_core";
import { useEvent } from "@/features/event/useEvent";
import { useCalendar } from "@/features/calendar/useCalendar";

type props = {
    readonly date: string;
};

export function Events({ date }: props) {
    const isMobile = useDevice().isMobile();
    const { events } = useEvent();
    const { year, month } = useCalendar();
    const calendar = { year, month };
    const [eventCalendar, setEventCalendar] = useState<EventCalendar>(new Map());

    useEffect(() => {
        if (events.length) {
            setEventCalendar(eventFns.getOnCalendar(events, calendar));
        }
    }, [events, year, month]);

    return (
        <div
            className={clss("flex-1 m-1", {
                "w-screen": isMobile,
            })}
        >
            {(eventCalendar.get(date) || []).map((evt) => (
                <EventItem
                    key={evt}
                    evt={evt}
                />
            ))}
        </div>
    );
}
