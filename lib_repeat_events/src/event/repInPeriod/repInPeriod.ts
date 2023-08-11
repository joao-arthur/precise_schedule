import { Event } from "../event.js";

import { Temporal } from "@js-temporal/polyfill";
import { closestRep } from "../closestRep/closestRep.js";
import { repLazy } from "../repLazy/repLazy.js";

export function repInPeriod(evt: Event, begin: string, end: string): string[] {
    let res: string[] = [];
    if (Temporal.PlainDate.compare(evt.d, end) === 1) {
        return res;
    }
    let base: string | undefined;
    if (Temporal.PlainDate.compare(evt.d, begin) === 1) {
        base = evt.d;
        res.push(base);
    } else {
        base = closestRep(evt, begin);
    }
    if (!base) {
        return res;
    }
    const itt = repLazy({ d: base, freq: evt.freq });
    let current = itt.next().value;
    while (current !== undefined && Temporal.PlainDate.compare(current, end) < 1) {
        res.push(current);
        current = itt.next().value;
    }
    return res;
}
