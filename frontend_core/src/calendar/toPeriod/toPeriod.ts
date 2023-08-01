import type { Calendar } from "../calendar.js";
import type { Period } from "../period.js";

import { Temporal } from "@js-temporal/polyfill";

export function toPeriod({ year, month }: Calendar): Period {
    const begin = Temporal.PlainDate.from({ year, month, day: 1 }).toString();
    const end = Temporal.PlainDate.from({
        year,
        month,
        day: Temporal.PlainDate.from({ year, month, day: 1 }).daysInMonth,
    }).toString();
    return [begin, end];
}
