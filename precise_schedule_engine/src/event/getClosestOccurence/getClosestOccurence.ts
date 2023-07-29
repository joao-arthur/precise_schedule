import type { Event } from "../model.js";

import { Temporal } from "@js-temporal/polyfill";

export function getClosestOccurence(event: Event, date: string): string | undefined {
    const eventDate = Temporal.PlainDate.from(event.day);
    const plainDate = Temporal.PlainDate.from(date);
    const daysDiff = eventDate.until(plainDate).days;
    if (daysDiff < 0) {
        return undefined;
    }
    switch (event.frequency) {
        case "1_D":
            return plainDate.subtract({ days: 1 }).toString();
        case "2_D":
            return plainDate.subtract({ days: daysDiff % 2 === 0 ? 2 : daysDiff % 2 }).toString();
        case "1_W":
            //plainDate.subtract(daysDiff % 7 === 0 ? { weeks: 1 } : { days: daysDiff % 7 });
            //eventDate.add({ weeks: Math.trunc((eventDate.until(plainDate).days - 1) / 7) });
            return plainDate
                .subtract(daysDiff % 7 === 0 ? { weeks: 1 } : { days: daysDiff % 7 })
                .toString();

        case "1_M":
            return undefined;
        case "3_M":
            return undefined;
        case "6_M":
            return undefined;
        case "1_Y":
            return eventDate
                .add({ years: Math.trunc((eventDate.until(plainDate).days - 1) / 365) })
                .toString();
        case "2_Y":
            return undefined;
        case "NEVER":
            return undefined;
    }

    return undefined;
}
