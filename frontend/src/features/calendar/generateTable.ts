import type { CalendarDisplay } from "./calendarDisplay";

const WEEK_DAYS = 7;
const ROWS = 6;

export function generateTable(
    { year, month }: CalendarDisplay,
): readonly (readonly number[])[] {
    const firstDayOfWeekInMonth = new Date(year, month, 1).getDay();
    return Array(ROWS)
        .fill(Array(WEEK_DAYS).fill(undefined))
        .map((week: number[], weekIndex) =>
            week.map((_, dayIndex) => {
                const cellIndex = weekIndex * WEEK_DAYS + dayIndex;
                const dayInMonth = cellIndex + 1 -
                    firstDayOfWeekInMonth;
                return dayInMonth;
            })
        );
}
