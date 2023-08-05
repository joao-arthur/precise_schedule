import { create } from "zustand";
import { dateFns } from "frontend_core";

type CalendarState = {
    readonly year: number;
    readonly month: number;
    readonly selectedDate: string | undefined;
    readonly toggleSelectedDate: (selectedDate: string) => void;
    readonly removeSelectedDate: () => void;
    readonly setYear: (year: number) => void;
    readonly setMonth: (month: number) => void;
    readonly setCurrentMonth: () => void;
};

export const useCalendar = create<CalendarState>((set) => ({
    year: dateFns.currentYear(),
    month: dateFns.currentMonth(),
    selectedDate: undefined,
    toggleSelectedDate: (selectedDate: string) =>
        set((state) => ({
            selectedDate: state.selectedDate !== selectedDate ? selectedDate : undefined,
        })),
    removeSelectedDate: () => set({ selectedDate: undefined }),
    setYear: (year: number) => set({ year }),
    setMonth: (month: number) => set({ month }),
    setCurrentMonth: () =>
        set({
            year: dateFns.currentYear(),
            month: dateFns.currentMonth(),
        }),
}));
