import type { Calendar } from "../../calendar/mod.js";
import type { Event } from "../event.js";
import type { EventCalendar } from "../eventCalendar.js";

import { repInPeriod } from "lib_repeat_events";
import { calendarFns } from "../../calendar/mod.js";

export function getOnCalendar(events: readonly Event[], cal: Calendar): EventCalendar {
    const eventsMap = new Map<string, readonly string[]>();

    events.forEach((evt) => {
        const evtReps = repInPeriod(
            { d: evt.day, freq: evt.frequency },
            ...calendarFns.toPeriod(cal),
        );
        evtReps.forEach((dt) => {
            const curr = eventsMap.get(dt);
            eventsMap.set(dt, (curr || []).concat(evt.id));
        });
    });
    return eventsMap;
}
