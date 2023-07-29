import type { Event } from "../model.js";

import { Temporal } from "@js-temporal/polyfill";

export function getRepetition(evt: Event): string | undefined {
    const evtAsPlainDate = Temporal.PlainDate.from(evt.d);
    switch (evt.freq) {
        case "1_D":
            return evtAsPlainDate.add({ days: 1 }).toString();
        case "2_D":
            return evtAsPlainDate.add({ days: 2 }).toString();
        case "1_W":
            return evtAsPlainDate.add({ days: 7 }).toString();
        case "1_M":
            return evtAsPlainDate.add({ months: 1 }).toString();
        case "3_M":
            return evtAsPlainDate.add({ months: 3 }).toString();
        case "6_M":
            return evtAsPlainDate.add({ months: 6 }).toString();
        case "1_Y":
            return evtAsPlainDate.add({ years: 1 }).toString();
        case "2_Y":
            return evtAsPlainDate.add({ years: 2 }).toString();
        case "NEVER":
            return undefined;
    }
}
