import type { Event } from "../event.js";

import { Temporal } from "@js-temporal/polyfill";

export function closestRep(evt: Event, date: string): string | undefined {
    const evtDt = Temporal.PlainDate.from(evt.d);
    const dateDt = Temporal.PlainDate.from(date).subtract({ days: 1 });
    if (Temporal.PlainDate.compare(evtDt, dateDt) === 1) {
        return undefined;
    }
    const d = evtDt.until(dateDt, { largestUnit: "days" }).days;
    const w = evtDt.until(dateDt, { largestUnit: "weeks" }).weeks;
    const m = evtDt.until(dateDt, { largestUnit: "months" }).months;
    const y = evtDt.until(dateDt, { largestUnit: "years" }).years;
    switch (evt.freq) {
        case "1D":
            return evtDt.add({ days: d }).toString();
        case "2D":
            return evtDt.add({ days: d - (d % 2) }).toString();
        case "1W":
            return evtDt.add({ weeks: w }).toString();
        case "1M":
            return evtDt.add({ months: m }).toString();
        case "3M":
            return evtDt.add({ months: m - (m % 3) }).toString();
        case "6M":
            return evtDt.add({ months: m - (m % 6) }).toString();
        case "1Y":
            return evtDt.add({ years: y }).toString();
        case "2Y":
            return evtDt.add({ years: y - (y % 2) }).toString();
        case undefined:
            return undefined;
    }
}
