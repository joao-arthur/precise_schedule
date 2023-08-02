import type { Calendar } from "../calendar.js";
import type { Period } from "../period.js";

import { Temporal } from "@js-temporal/polyfill";

export function toPeriod({ year, month }: Calendar): Period {
    const firstDay = Temporal.PlainDate.from({ year, month, day: 1 });
    const begin = firstDay.toString();
    const end = Temporal.PlainDate.from({ year, month, day: firstDay.daysInMonth }).toString();
    return [begin, end];
}
