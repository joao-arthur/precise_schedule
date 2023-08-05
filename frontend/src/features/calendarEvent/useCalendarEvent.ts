import type { EventCalendar } from "frontend_core";
import { eventFns } from "frontend_core";
import { useCallback, useEffect, useState } from "react";
import { useCalendar } from "../calendar/useCalendar";
import { useEvent } from "../event/useEvent";

export function useCalendarEvent() {
    const [eventCalendar, setEventCalendar] = useState<EventCalendar>(new Map());
    const { year, month } = useCalendar();
    const { events } = useEvent();

    useEffect(() => {
        if (events.length) {
            setEventCalendar(eventFns.getOnCalendar(events, { year, month }));
        }
    }, [events, year, month]);

    const getDateEvents = useCallback(
        (date: string) => eventCalendar.get(date) || [],
        [eventCalendar],
    );

    return { getDateEvents };
}
