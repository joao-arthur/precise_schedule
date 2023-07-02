import type { CreateEvent, PartyEvent } from "./event";

export function buildPartyEvent(
    event: PartyEvent,
): CreateEvent {
    return {
        name: event.name,
        day: event.day,
        begin: event.begin,
        end: event.end,
        category: "PARTY",
        frequency: "1_Y",
        weekendRepeat: false,
    };
}
