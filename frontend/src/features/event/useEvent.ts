import { Event } from "@/features/event/event";
import { create } from "zustand";

type EventsState = {
    readonly events: readonly Event[];
    readonly setEvents: (events: readonly Event[]) => void;
};

export const useEvent = create<EventsState>((set) => ({
    events: [],
    setEvents: (events: readonly Event[]) => set({ events }),
    //getMonthEvents: (month: number) => {},
}));
