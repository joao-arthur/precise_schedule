import { Temporal } from "@js-temporal/polyfill";

export function formatDay(date: string): string {
    return String(Temporal.PlainDate.from(date).day).padStart(2, "0");
}
