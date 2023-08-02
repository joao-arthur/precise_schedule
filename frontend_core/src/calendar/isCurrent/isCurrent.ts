import { Temporal } from "@js-temporal/polyfill";
import type { Calendar } from "../calendar.js";

export function isCurrent({ year, month }: Calendar): boolean {
    const now = Temporal.Now.instant().toZonedDateTimeISO(Temporal.Now.timeZoneId());
    return year === now.year && month === now.month;
}
