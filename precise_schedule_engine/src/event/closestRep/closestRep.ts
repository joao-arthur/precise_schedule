import type { Event } from "../model.js";

import { Temporal } from "@js-temporal/polyfill";

export function getClosestOccurence(evt: Event, date: string): string | undefined {
    const evtAsPlainDate = Temporal.PlainDate.from(evt.d);
    const dateAsPlainDate = Temporal.PlainDate.from(date);
    const daysDiff = evtAsPlainDate.until(dateAsPlainDate).days;
    if (daysDiff < 0) {
        return undefined;
    }
    switch (evt.freq) {
        case "1_D":
            return dateAsPlainDate.subtract({ days: 1 }).toString();
        case "2_D":
            return dateAsPlainDate
                .subtract({ days: daysDiff % 2 === 0 ? 2 : daysDiff % 2 })
                .toString();
        case "1_W":
            //dateAsPlainDate.subtract(daysDiff % 7 === 0 ? { weeks: 1 } : { days: daysDiff % 7 });
            //evtAsPlainDate.add({ weeks: Math.trunc((evtAsPlainDate.until(dateAsPlainDate).days - 1) / 7) });
            return dateAsPlainDate
                .subtract(daysDiff % 7 === 0 ? { weeks: 1 } : { days: daysDiff % 7 })
                .toString();
        case "1_M":
            return undefined;
        case "3_M":
            return undefined;
        case "6_M":
            return undefined;
        case "1_Y":
            return evtAsPlainDate
                .add({ years: Math.trunc((evtAsPlainDate.until(dateAsPlainDate).days - 1) / 365) })
                .toString();
        case "2_Y":
            return undefined;
        case "NEVER":
            return undefined;
    }

    return undefined;
}
