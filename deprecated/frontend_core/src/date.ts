import { Temporal } from "@js-temporal/polyfill";

export type Months = readonly [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
];

export type WeekDays = readonly [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
];

export function current(): Temporal.ZonedDateTime {
    return Temporal.Now.instant().toZonedDateTimeISO(Temporal.Now.timeZoneId());
}
export function currentMonth(): number {
    return current().month;
}

export function currentYear(): number {
    return current().year;
}

export function formatDate(date: string, locale: string): string {
    return Temporal.PlainDate.from(date).toLocaleString(locale);
}

export function formatDay(date: string): string {
    return String(Temporal.PlainDate.from(date).day).padStart(2, "0");
}

export function formatMonth(
    month: number,
    locale: string,
    format: "long" | "short" | "narrow",
): string {
    function fmt(date: Temporal.PlainDate): string {
        return date.toLocaleString(locale, { month: format })
            .toLocaleLowerCase()
            .replace(".", "");
    }
    return fmt(Temporal.PlainDate.from(`2000-${String(month).padStart(2, "0")}-01`));
}

export function formatMonths(locale: string, format: "long" | "short" | "narrow"): Months {
    function fmt(date: Temporal.PlainDate): string {
        return date.toLocaleString(locale, { month: format })
            .toLocaleLowerCase()
            .replace(".", "");
    }
    return [
        fmt(Temporal.PlainDate.from("2000-01-01")),
        fmt(Temporal.PlainDate.from("2000-02-01")),
        fmt(Temporal.PlainDate.from("2000-03-01")),
        fmt(Temporal.PlainDate.from("2000-04-01")),
        fmt(Temporal.PlainDate.from("2000-05-01")),
        fmt(Temporal.PlainDate.from("2000-06-01")),
        fmt(Temporal.PlainDate.from("2000-07-01")),
        fmt(Temporal.PlainDate.from("2000-08-01")),
        fmt(Temporal.PlainDate.from("2000-09-01")),
        fmt(Temporal.PlainDate.from("2000-10-01")),
        fmt(Temporal.PlainDate.from("2000-11-01")),
        fmt(Temporal.PlainDate.from("2000-12-01")),
    ];
}

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
