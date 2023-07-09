import { create } from "zustand";

type CalendarState = {
    readonly year: number;
    readonly month: number;
    readonly selectedDate: string;
    readonly toggleSelectedDate: (selectedDate: string) => void;
    readonly removeSelectedDate: () => void;
    readonly setYear: (year: number) => void;
    readonly setMonth: (month: number) => void;
    readonly setCurrentMonth: () => void;
};

export const useCalendar = create<CalendarState>((set) => ({
    events: [],
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    selectedDate: "",
    toggleSelectedDate: (selectedDate: string) =>
        set((state) => ({
            selectedDate: state.selectedDate !== selectedDate ? selectedDate : "",
        })),
    removeSelectedDate: () => set({ selectedDate: "" }),
    setYear: (year: number) => set({ year }),
    setMonth: (month: number) => set({ month }),
    setCurrentMonth: () =>
        set({
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
        }),
}));
