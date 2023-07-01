import type { CalendarDisplay } from "./calendarDisplay";

export function isCurrentDate({ year, month }: CalendarDisplay) {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    return year === currentYear && month === currentMonth;
}
