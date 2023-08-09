import { Temporal } from "@js-temporal/polyfill";

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
