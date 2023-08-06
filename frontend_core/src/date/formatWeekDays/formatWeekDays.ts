import type { WeekDays } from "../weekDays.js";
import { Temporal } from "@js-temporal/polyfill";

export function formatWeekDays(locale: string, format: "long" | "short" | "narrow"): WeekDays {
    function fmt(date: Temporal.PlainDate): string {
        return date
            .toLocaleString(locale, { weekday: format })
            .toLocaleLowerCase()
            .replace(".", "");
    }

    return [
        fmt(Temporal.PlainDate.from("2000-10-01")),
        fmt(Temporal.PlainDate.from("2000-10-02")),
        fmt(Temporal.PlainDate.from("2000-10-03")),
        fmt(Temporal.PlainDate.from("2000-10-04")),
        fmt(Temporal.PlainDate.from("2000-10-05")),
        fmt(Temporal.PlainDate.from("2000-10-06")),
        fmt(Temporal.PlainDate.from("2000-10-07")),
    ];
}
