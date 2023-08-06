import { Temporal } from "@js-temporal/polyfill";

type Week = readonly [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
];

export function formatWeek(locale: string, format: "long" | "short" | "narrow"): Week {
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
