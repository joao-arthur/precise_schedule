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
    const device = useDevice();
    const isMobile = device.isMobile();

    const [eventCalendar, setEventCalendar] = useState<EventCalendar>(new Map());
    const { year, month } = useCalendar();
    const calendar = { year, month };
    const { events } = useEvent();

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
            {(eventCalendar.get(date) || []).map((event) => (
                <EventItem
                    event={event}
                    key={event}
                />
            ))}
        </div>
    );
}
