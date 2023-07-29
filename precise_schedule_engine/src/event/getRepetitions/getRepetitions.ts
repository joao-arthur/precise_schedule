import { Event } from "../model.js";

import { Temporal } from "@js-temporal/polyfill";
import { getNextOccurence } from "../getNextOccurence/getNextOccurence.js";
import { getClosestOccurence } from "../getClosestOccurence/getClosestOccurence.js";

export function getRepetitions(event: Event, begin: string, end: string): string[] {
    const base = getClosestOccurence(event, begin);

    if (!base) {
        return [];
    }

    let current = base;
    let res = [];
    while (Temporal.PlainDate.from(current).since(end).days < 0) {
        const maybeMonthEvent = getNextOccurence({ ...event, day: current });
        if (!maybeMonthEvent) {
            return [];
        }
        res.push(maybeMonthEvent);
        current = maybeMonthEvent;
    }
    return res;
}
