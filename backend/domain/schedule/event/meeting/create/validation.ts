import type { Schema } from "../../../../validation/schema.ts";
import type { MeetingCreateModel } from "./model.ts";

export const createMeetingValidation: Schema<MeetingCreateModel> = {
    name: [
        { type: "str" },
        { type: "strMinLen", min: 1 },
        { type: "strMaxLen", max: 32 },
    ],
    day: [
        { type: "dt" },
        { type: "dtMin", min: "1970-01-01" },
    ],
    begin: [
        { type: "time" },
    ],
    end: [
        { type: "time" },
    ],
    frequency: [
        { type: "enum", values: ["1_D", "2_D", "1_W", "1_M", "3_M", "6_M", "1_Y", "2_Y", "NEVER"] },
    ],
    weekendRepeat: [
        { type: "bool" },
    ],
};
