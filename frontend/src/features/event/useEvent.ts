import type { Event } from "frontend_core";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type EventsState = {
    readonly events: readonly Event[];
    readonly add: (event: Event) => void;
    readonly update: (event: Event) => void;
    readonly remove: (id: Event["id"]) => void;
};

export const useEvent = create(
    persist<EventsState>((set) => ({
        events: [],
        add: (event: Event) => set(({ events }) => ({ events: events.concat(event) })),
        update: (event: Event) =>
            set(({ events }) => (
                { events: events.filter((e) => e.id !== event.id).concat(event) }
            )),
        remove: (id: Event["id"]) =>
            set(({ events }) => (
                { events: events.filter((event) => event.id !== id) }
            )),
    }), {
        name: "@PS/events",
        storage: createJSONStorage(() => window.localStorage),
    }),
);
