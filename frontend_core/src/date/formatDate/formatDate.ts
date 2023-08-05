import { Temporal } from "@js-temporal/polyfill";

export function formatDate(date: string, locale: string): string {
    return Temporal.PlainDate.from(date).toLocaleString(locale);
}
