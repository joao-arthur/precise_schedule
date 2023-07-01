import { Event } from "@/features/event/event";

type importanceOption = {
    readonly id: Event["importance"];
    readonly label: string;
};

export const importanceOptions: readonly importanceOption[] = [
    { id: "HIGH", label: "high" },
    { id: "MEDIUM", label: "average" },
    { id: "LOW", label: "low" },
];

type categoryOption = {
    readonly id: Event["category"];
    readonly label: string;
};

export const categoryOptions: readonly categoryOption[] = [
    { id: "APPOINTMENT", label: "apointment" },
    { id: "BIRTHDAY", label: "birthday" },
    { id: "DATE", label: "date" },
    { id: "MEETING", label: "meeting" },
    { id: "PARTY", label: "party" },
];

type frequencyOption = {
    readonly id: Event["frequency"];
    readonly label: string;
};

export const frequencyOptions: readonly frequencyOption[] = [
    { id: "1_D", label: "everyday" },
    { id: "2_D", label: "every other day" },
    { id: "1_W", label: "every week" },
    { id: "1_M", label: "every a month" },
    { id: "3_M", label: "every three months" },
    { id: "6_M", label: "every 6 months" },
    { id: "1_Y", label: "every year" },
    { id: "2_Y", label: "every 2 years" },
];
