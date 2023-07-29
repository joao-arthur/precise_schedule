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
    while (true) {
        const maybeMonthEvent = getNextOccurence({ ...event, day: current });
        if (!maybeMonthEvent) {
            return [];
        }
        if (Temporal.PlainDate.from(maybeMonthEvent).since(end).days > 0) {
            break;
        }
        res.push(maybeMonthEvent);
        current = maybeMonthEvent;
    }
    return res;
}
