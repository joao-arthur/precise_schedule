import { repeatFrequencyType } from "../../eventType";

type repeatFrequencyOption = {
    readonly id: repeatFrequencyType;
    readonly label: string;
};

export const repeatFrequencyOptions:
    readonly repeatFrequencyOption[] = [
        { id: "1_D", label: "everyday" },
        { id: "2_D", label: "every other day" },
        { id: "1_W", label: "every week" },
        { id: "2_W", label: "every 2 weeks" },
        { id: "1_M", label: "every a month" },
        { id: "2_M", label: "every two months" },
        { id: "6_M", label: "every 6 months" },
        { id: "1_Y", label: "every year" },
        { id: "2_Y", label: "every 2 years" },
        { id: "5_Y", label: "every 5 years" },
        { id: "10_Y", label: "every 10 years" },
        { id: "NEVER", label: "never" },
    ] as const;
