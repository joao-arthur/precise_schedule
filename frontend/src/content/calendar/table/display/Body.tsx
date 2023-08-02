import type { EventCalendar } from "frontend_core";

import { useEffect, useState } from "react";
import { calendarFns, eventFns } from "frontend_core";
import { useEvent } from "@/features/event/useEvent";
import { useCalendar } from "@/features/calendar/useCalendar";
import { Cell } from "./Cell";

export function Body() {
    const [eventCalendar, setEventCalendar] = useState<EventCalendar>(new Map());
    const { year, month } = useCalendar();
    const calendar = { year, month };
    const { events } = useEvent();

    useEffect(() => {
        if (events.length) {
            setEventCalendar(eventFns.getOnCalendar(events, { year, month }));
        }
    }, [events, year, month]);

    return (
        <>
            {calendarFns.toTable({ year, month }).map((week, weekIndex) => (
                <div className="flex flex-1" key={weekIndex}>
                    {week.map((date) => (
                        <Cell
                            calendar={calendar}
                            date={date}
                            key={date}
                            events={eventCalendar.get(date) || []}
                        />
                    ))}
                </div>
            ))}
        </>
    );
}
