import { create } from "zustand";
import { dateFns } from "frontend_core";

type CalendarState = {
    readonly year: number;
    readonly month: number;
    readonly selectedDate: string | undefined;
    readonly toggleSelectedDate: (selectedDate: string) => void;
    readonly removeSelectedDate: () => void;
    readonly setCurrentMonth: () => void;
    readonly next: () => void;
    readonly prev: () => void;
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
    setCurrentMonth: () =>
        set({
            year: dateFns.currentYear(),
            month: dateFns.currentMonth(),
        }),
    next: () =>
        set((state) =>
            state.month === 12
                ? {
                    year: state.year + 1,
                    month: 1,
                }
                : {
                    month: state.month + 1,
                }
        ),
    prev: () =>
        set((state) =>
            state.month === 1
                ? {
                    year: state.year - 1,
                    month: 12,
                }
                : {
                    month: state.month - 1,
                }
        ),
}));
