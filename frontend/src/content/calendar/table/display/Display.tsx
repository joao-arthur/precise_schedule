import { useWindowSize } from "usehooks-ts";
import { calendarFns } from "frontend_core";
import { useCalendar } from "@/features/calendar/useCalendar";
import { useCalendarEvent } from "@/features/calendarEvent/useCalendarEvent";
import { Cell } from "./Cell";
import { useDevice } from "@/lib/device/useDevice";
import { Text } from "@/components/atoms/Text";

const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const daysOfWeekAbbrev = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
];

// unify both headers

export function Display() {
    const isMobile = useDevice().isMobile();
    const { year, month } = useCalendar();
    const calendar = { year, month };
    const { getDateEvents } = useCalendarEvent();
    const { height } = useWindowSize();
    const weekDays = isMobile ? daysOfWeekAbbrev : daysOfWeek;

    return (
        <>
            <div
                className="grid h-6"
                style={{ gridTemplateColumns: "repeat(7, 1fr)" }}
            >
                {daysOfWeek.map((weekDay) => (
                    <Text key={weekDay}>
                        <div className="select-none text-center font-bold m-auto">{weekDay}</div>
                    </Text>
                ))}
            </div>
            <div className="w-full h-full" style={{ height: `calc(${height}px - 6.75rem)` }}>
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
        </>
    );
}
