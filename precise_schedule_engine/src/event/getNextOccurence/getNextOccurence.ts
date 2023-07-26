import { Temporal } from "@js-temporal/polyfill";

import type { Event } from "../model.js";

export function getNextOccurence(event: Event): string | undefined {
    switch (event.frequency) {
        case "1_D":
            return Temporal.PlainDate.from(event.day).add({ days: 1 }).toString();
        case "2_D":
            return Temporal.PlainDate.from(event.day).add({ days: 2 }).toString();
        case "1_W":
            return Temporal.PlainDate.from(event.day).add({ days: 7 }).toString();
        case "1_M":
            return Temporal.PlainDate.from(event.day).add({ months: 1 }).toString();
        case "3_M":
            return Temporal.PlainDate.from(event.day).add({ months: 3 }).toString();
        case "6_M":
            return Temporal.PlainDate.from(event.day).add({ months: 6 }).toString();
        case "1_Y":
            return Temporal.PlainDate.from(event.day).add({ years: 1 }).toString();
        case "2_Y":
            return Temporal.PlainDate.from(event.day).add({ years: 2 }).toString();
        case "NEVER":
            return undefined;
    }
}
