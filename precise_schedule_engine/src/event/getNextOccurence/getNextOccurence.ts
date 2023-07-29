import type { Event } from "../model.js";

import { Temporal } from "@js-temporal/polyfill";

export function getNextOccurence(event: Event): string | undefined {
    const eventDate = Temporal.PlainDate.from(event.day);
    switch (event.frequency) {
        case "1_D":
            return eventDate.add({ days: 1 }).toString();
        case "2_D":
            return eventDate.add({ days: 2 }).toString();
        case "1_W":
            return eventDate.add({ days: 7 }).toString();
        case "1_M":
            return eventDate.add({ months: 1 }).toString();
        case "3_M":
            return eventDate.add({ months: 3 }).toString();
        case "6_M":
            return eventDate.add({ months: 6 }).toString();
        case "1_Y":
            return eventDate.add({ years: 1 }).toString();
        case "2_Y":
            return eventDate.add({ years: 2 }).toString();
        case "NEVER":
            return undefined;
    }
}
