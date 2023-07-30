import { Temporal } from "@js-temporal/polyfill";

export function monthPeriod(year: number, month: number): readonly [string, string] {
    const begin = Temporal.PlainDate.from({ year, month, day: 1 }).toString();
    const end = Temporal.PlainDate.from({
        year,
        month,
        day: Temporal.PlainDate.from({ year, month, day: 1 }).daysInMonth,
    }).toString();
    return [begin, end];
}
