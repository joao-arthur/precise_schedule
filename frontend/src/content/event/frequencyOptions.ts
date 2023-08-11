import type { Event } from "frontend_core";

type frequencyOption = {
    readonly id: Event["frequency"];
    readonly label: string;
};

export const frequencyOptions = [
    { id: "1D", label: "Everyday" },
    { id: "2D", label: "Every other day" },
    { id: "1W", label: "Every week" },
    { id: "1M", label: "Every month" },
    { id: "3M", label: "Every three months" },
    { id: "6M", label: "Every 6 months" },
    { id: "1Y", label: "Every year" },
    { id: "2Y", label: "Every 2 years" },
] satisfies frequencyOption[];
