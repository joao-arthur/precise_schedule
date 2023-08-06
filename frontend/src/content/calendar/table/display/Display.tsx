import { useWindowSize } from "usehooks-ts";
import { calendarFns } from "frontend_core";
import { useCalendar } from "@/features/calendar/useCalendar";
import { useCalendarEvent } from "@/features/calendarEvent/useCalendarEvent";
import { Cell } from "./Cell";

export function Display() {
    const { year, month } = useCalendar();
    const calendar = { year, month };
    const { getDateEvents } = useCalendarEvent();
    const { height } = useWindowSize();

    return (
        <div className="w-full h-full" style={{ height: `calc(${height}px - 5.25rem)` }}>
            <div
                className="grid w-full h-full"
                style={{ gridTemplateRows: "repeat(6, 1fr)" }}
            >
                {calendarFns.toTable(calendar).map((week, weekIndex) => (
                    <div
                        className="grid min-h-0"
                        style={{ gridTemplateColumns: "repeat(7, 1fr)" }}
                        key={weekIndex}
                    >
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
            </div>
        </div>
    );
}
