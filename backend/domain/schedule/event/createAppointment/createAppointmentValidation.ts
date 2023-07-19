import type { Schema } from "@ps/domain/validation/Schema.ts";
import type { CreateAppointmentEvent } from "./CreateAppointmentEvent.ts";

export const createAppointmentValidation: Schema<CreateAppointmentEvent> = {
    name: [
        { v: "str" },
        { v: "strMinLen", min: 1 },
        { v: "strMaxLen", max: 32 },
    ],
    day: [
        { v: "dt" },
        { v: "dtMin", min: "1970-01-01" },
    ],
    begin: [
        { v: "time" },
    ],
    end: [
        { v: "time" },
    ],
    frequency: [
        { v: "enum", values: ["1_D", "2_D", "1_W", "1_M", "3_M", "6_M", "1_Y", "2_Y", "NEVER"] },
    ],
    weekendRepeat: [
        { v: "bool" },
    ],
    user: [
        { v: "str" },
    ],
};
