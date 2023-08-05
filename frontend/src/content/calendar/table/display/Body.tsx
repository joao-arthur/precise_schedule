import { calendarFns } from "frontend_core";
import { useCalendar } from "@/features/calendar/useCalendar";
import { useCalendarEvent } from "@/features/calendarEvent/useCalendarEvent";
import { Cell } from "./Cell";

export function Body() {
    const { year, month } = useCalendar();
    const calendar = { year, month };
    const { getDateEvents } = useCalendarEvent();

    return (
        <>
            {calendarFns.toTable(calendar).map((week, weekIndex) => (
                <div className="flex flex-1" key={weekIndex}>
                    {week.map((date) => (
                        <Cell
                            calendar={calendar}
                            date={date}
                            key={date}
                            events={getDateEvents(date)}
                        />
                    ))}
                </div>
            ))}
        </>
    );
}
