import { importanceType } from "../../eventType";

type importanceOption = {
    readonly id: importanceType;
    readonly label: string;
};

export const importanceOptions: readonly importanceOption[] = [
    { id: "HIGH", label: "high" },
    { id: "AVERAGE", label: "average" },
    { id: "LOW", label: "low" },
] as const;
