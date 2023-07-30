import { Event } from "../event.js";

import { Temporal } from "@js-temporal/polyfill";
import { closestRep } from "../closestRep/closestRep.js";
import { repIter } from "../repIter/repIter.js";

export function repInPeriod(evt: Event, begin: string, end: string): string[] {
    let res: string[] = [];
    const base = closestRep(evt, begin);
    if (!base) {
        return res;
    }
    const itt = repIter({ d: base, freq: evt.freq });
    let current = itt.next().value;
    while (Temporal.PlainDate.compare(current, end) < 1) {
        res.push(current);
        current = itt.next().value;
    }
    return res;
}
