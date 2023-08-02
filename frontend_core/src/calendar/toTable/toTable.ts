import type { CalendarTable } from "../calendarTable.js";
import type { Calendar } from "../calendar.js";
import { Temporal } from "@js-temporal/polyfill";

const weekDays = 7;
const rows = 6;

export function toTable({ year, month }: Calendar): CalendarTable {
    const firstDay = Temporal.PlainDate.from({ year, month, day: 1 });
    return Array(rows)
        .fill(Array(weekDays).fill(undefined))
        .map((week: number[], weekIndex) =>
            week.map((_, dayIndex) => {
                const cellIndex = weekIndex * weekDays + dayIndex;
                const dayInMonthIndex = cellIndex - firstDay.dayOfWeek;
                return firstDay.add({ days: dayInMonthIndex }).toString();
            })
        );
}
