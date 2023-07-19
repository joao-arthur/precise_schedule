import type { Schema } from "@ps/domain/validation/Schema.ts";
import type { CreateBirthdayEvent } from "./CreateBirthdayEvent.ts";

export const createBirthdayValidation: Schema<CreateBirthdayEvent> = {
    name: [
        { v: "str" },
        { v: "strMinLen", min: 1 },
        { v: "strMaxLen", max: 32 },
    ],
    day: [
        { v: "dt" },
        { v: "dtMin", min: "1970-01-01" },
    ],
    user: [
        { v: "str" },
    ],
};
