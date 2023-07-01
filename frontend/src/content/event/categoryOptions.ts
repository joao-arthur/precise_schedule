import { categoryType } from "../../eventType";

type categoryOption = {
    readonly id: categoryType;
    readonly label: string;
};

export const categoryOptions: readonly categoryOption[] = [
    { id: "APPOINTMENT", label: "apointment" },
    { id: "BIRTHDAY", label: "birthday" },
    { id: "DATE", label: "date" },
    { id: "MEETING", label: "meeting" },
    { id: "PARTY", label: "party" },
] as const;
