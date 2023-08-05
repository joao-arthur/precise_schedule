import { Temporal } from "@js-temporal/polyfill";

export function current(): Temporal.ZonedDateTime {
    return Temporal.Now.instant().toZonedDateTimeISO(Temporal.Now.timeZoneId());
}
