import { Event } from "../model.js";

import { Temporal } from "@js-temporal/polyfill";
import { getNextOccurence } from "../getNextOccurence/getNextOccurence.js";
import { getClosestOccurence } from "../getClosestOccurence/getClosestOccurence.js";

export function getRepetitions(evt: Event, begin: string, end: string): string[] {
    const base = getClosestOccurence(evt, begin);

    if (!base) {
        return [];
    }

    let current = base;
    let res = [];
    while (true) {
        const maybeMonthEvent = getNextOccurence({ ...evt, d: current });
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
