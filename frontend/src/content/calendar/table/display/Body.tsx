import { useEffect, useState } from "react";
import { monthPeriod } from "engine";
import { repInPeriod } from "repeat_events";
import { useEvent } from "@/features/event/useEvent";
import { useCalendar } from "@/features/calendar/useCalendar";
import { generateTable } from "@/features/calendar/generateTable";
import { Cell } from "./Cell";
import { Event } from "@/features/event/event";

export function Body() {
    const [monthEvents, setMonthEvents] = useState<readonly (readonly Event[])[]>(
        Array(32).fill(undefined).map(() => []),
    );
    const { year, month } = useCalendar();
    const { events } = useEvent();

    let eventsArr: readonly Event[][] = Array(32).fill(undefined).map(() => []);

    useEffect(() => {
        if (events.length) {
            eventsArr = Array(32).fill(undefined).map(() => []);
            events.forEach((evt) => {
                const evtReps = repInPeriod(
                    { d: evt.day, freq: evt.frequency },
                    ...monthPeriod(year, month + 1),
                ).map((dt) => Number(dt.slice(8)));
                evtReps.forEach((repDay) => {
                    eventsArr[repDay].push(evt);
                });
            });
        }
        setMonthEvents(eventsArr);
    }, [events, year, month]);

    return (
        <>
            {generateTable({ year, month }).map((week, weekIndex) => (
                <div className="flex flex-1" key={weekIndex}>
                    {week.map((day) => (
                        <Cell
                            year={year}
                            month={month}
                            day={day}
                            key={day}
                            events={monthEvents[day] || []}
                        />
                    ))}
                </div>
            ))}
        </>
    );
}
