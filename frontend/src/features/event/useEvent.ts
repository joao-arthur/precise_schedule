import { Event } from "@/features/event/event";
import { map } from "funis";
import { create } from "zustand";

type EventsState = {
    readonly events: readonly Event[];
    readonly eventsMap: Map<string, Event>;
    readonly setEvents: (events: readonly Event[]) => void;
};

export const useEvent = create<EventsState>((set) => ({
    events: [],
    eventsMap: new Map(),
    setEvents: (events: readonly Event[]) =>
        set({ events, eventsMap: map.fromObjectArray(events, "id") }),
}));
