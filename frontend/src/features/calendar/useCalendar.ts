import { create } from "zustand";

type CalendarState = {
    readonly year: number;
    readonly month: number;
    readonly selectedDay: string | undefined;
    readonly toggleSelectedDate: (selectedDay: string) => void;
    readonly removeSelectedDate: () => void;
    readonly setYear: (year: number) => void;
    readonly setMonth: (month: number) => void;
    readonly setCurrentMonth: () => void;
};

export const useCalendar = create<CalendarState>((set) => ({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    selectedDay: undefined,
    toggleSelectedDate: (selectedDay: string) =>
        set((state) => ({
            selectedDay: state.selectedDay !== selectedDay ? selectedDay : undefined,
        })),
    removeSelectedDate: () => set({ selectedDay: undefined }),
    setYear: (year: number) => set({ year }),
    setMonth: (month: number) => set({ month }),
    setCurrentMonth: () =>
        set({
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
        }),
}));
