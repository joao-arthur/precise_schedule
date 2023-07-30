import type { Event } from "../event.js";

import { Temporal } from "@js-temporal/polyfill";

export function rep(evt: Event, i = 1): string | undefined {
    const evtAsPlainDate = Temporal.PlainDate.from(evt.d);
    switch (evt.freq) {
        case "1D":
            return evtAsPlainDate.add({ days: 1 * i }).toString();
        case "2D":
            return evtAsPlainDate.add({ days: 2 * i }).toString();
        case "1W":
            return evtAsPlainDate.add({ days: 7 * i }).toString();
        case "1M":
            return evtAsPlainDate.add({ months: 1 * i }).toString();
        case "3M":
            return evtAsPlainDate.add({ months: 3 * i }).toString();
        case "6M":
            return evtAsPlainDate.add({ months: 6 * i }).toString();
        case "1Y":
            return evtAsPlainDate.add({ years: 1 * i }).toString();
        case "2Y":
            return evtAsPlainDate.add({ years: 2 * i }).toString();
        case undefined:
            return undefined;
    }
}
