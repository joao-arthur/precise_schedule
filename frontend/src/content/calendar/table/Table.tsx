import { useWindowSize } from "usehooks-ts";
import { calendarFns } from "frontend_core";
import { useCalendar } from "@/features/calendar/useCalendar";
import { useCalendarEvent } from "@/features/calendarEvent/useCalendarEvent";
import { useWeekDays } from "@/features/date/useWeekDays";
import { Text } from "@/components/atoms/Text";
import { TableWrapper } from "./TableWrapper";
import { Cell } from "./Cell";

export function Table() {
    const { year, month } = useCalendar();
    const calendar = { year, month };
    const { getDateEvents } = useCalendarEvent();
    const { height } = useWindowSize();
    const weekDays = useWeekDays();

    return (
        <TableWrapper>
            <div
                className="grid h-6"
                style={{ gridTemplateColumns: "repeat(7, 1fr)" }}
            >
                {weekDays.map((weekDay) => (
                    <Text key={weekDay}>
                        <div className="select-none text-center font-bold m-auto capitalize">
                            {weekDay}
                        </div>
                    </Text>
                ))}
            </div>
            <div className="w-full h-full" style={{ height: `calc(${height}px - 4.5rem)` }}>
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
        </TableWrapper>
    );
}
