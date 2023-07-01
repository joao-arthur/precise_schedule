import { Event } from "@/features/event/event";

type importanceOption = {
    readonly id: Event["importance"];
    readonly label: string;
};

export const importanceOptions: readonly importanceOption[] = [
    { id: "HIGH", label: "High" },
    { id: "MEDIUM", label: "Medium" },
    { id: "LOW", label: "Low" },
];

type categoryOption = {
    readonly id: Event["category"];
    readonly label: string;
};

export const categoryOptions: readonly categoryOption[] = [
    { id: "APPOINTMENT", label: "Apointment" },
    { id: "BIRTHDAY", label: "Birthday" },
    { id: "DATE", label: "Date" },
    { id: "MEETING", label: "Meeting" },
    { id: "PARTY", label: "Party" },
];

type frequencyOption = {
    readonly id: Event["frequency"];
    readonly label: string;
};

export const frequencyOptions: readonly frequencyOption[] = [
    { id: "1_D", label: "Everyday" },
    { id: "2_D", label: "Every other day" },
    { id: "1_W", label: "Every week" },
    { id: "1_M", label: "Every month" },
    { id: "3_M", label: "Every three months" },
    { id: "6_M", label: "Every 6 months" },
    { id: "1_Y", label: "Every year" },
    { id: "2_Y", label: "Every 2 years" },
];
