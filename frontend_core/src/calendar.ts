import { Temporal } from "@js-temporal/polyfill";
import { current } from "./date.js";

export type Calendar = {
    readonly year: number;
    readonly month: number;
};

export type CalendarTable = readonly (readonly string[])[];

export type Period = readonly [string, string];

export function isCurrent({ year, month }: Calendar): boolean {
    const now = current();
    return year === now.year && month === now.month;
}

export function isDateIn({ year, month }: Calendar, date: string): boolean {
    const firstDay = Temporal.PlainDate.from({ year, month, day: 1 });
    const dtDate = Temporal.PlainDate.from(date);
    return firstDay.year === dtDate.year && firstDay.month === dtDate.month;
}

export function toPeriod({ year, month }: Calendar): Period {
    const firstDay = Temporal.PlainDate.from({ year, month, day: 1 });
    const begin = firstDay.toString();
    const end = Temporal.PlainDate.from({ year, month, day: firstDay.daysInMonth }).toString();
    return [begin, end];
}

export function toTable({ year, month }: Calendar): CalendarTable {
    const weekDays = 7;
    const rows = 6;

    const firstDay = Temporal.PlainDate.from({ year, month, day: 1 });
    return Array(rows)
        .fill(Array(weekDays).fill(undefined))
        .map((week: readonly number[], weekIndex) =>
            week.map((_, dayIndex) => {
                const cellIndex = weekIndex * weekDays + dayIndex;
                const dayInMonthIndex = cellIndex - firstDay.dayOfWeek;
                return firstDay.add({ days: dayInMonthIndex }).toString();
            })
        );
}
