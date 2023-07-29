import { Event } from "../event.js";

import { Temporal } from "@js-temporal/polyfill";
import { rep } from "../rep/rep.js";
import { closestRep } from "../closestRep/closestRep.js";

export function repInPeriod(evt: Event, begin: string, end: string): string[] {
    const base = closestRep(evt, begin);

    if (!base) {
        return [];
    }

    let current = base;
    let res = [];
    while (true) {
        const maybeMonthEvent = rep({ ...evt, d: current });
        if (!maybeMonthEvent) {
            return [];
        }
        if (Temporal.PlainDate.compare(maybeMonthEvent, end) === 1) {
            break;
        }
        res.push(maybeMonthEvent);
        current = maybeMonthEvent;
    }
    return res;
}
