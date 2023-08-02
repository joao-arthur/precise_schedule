import { Temporal } from "@js-temporal/polyfill";
import { Calendar } from "../calendar.js";

export function isDateIn({ year, month }: Calendar, date: string): boolean {
    const firstDay = Temporal.PlainDate.from({ year, month, day: 1 });
    const dtDate = Temporal.PlainDate.from(date);
    return firstDay.year === dtDate.year && firstDay.month === dtDate.month;
}
