import type { Event } from "../event.js";

import { Temporal } from "@js-temporal/polyfill";
import { repInPeriod } from "../repInPeriod/repInPeriod.js";

export function monthEvents(evts: Event[], year: number, month: number): readonly string[][] {
    const begin = Temporal.PlainDate.from({ year, month, day: 1 }).toString();
    const end = Temporal.PlainDate.from({
        year,
        month,
        day: Temporal.PlainDate.from({ year, month, day: 1 }).daysInMonth,
    }).toString();
    return evts.map((evt) => repInPeriod(evt, begin, end));
}
