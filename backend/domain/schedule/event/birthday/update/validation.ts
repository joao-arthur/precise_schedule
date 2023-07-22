import type { Schema } from "../../../../validation/Schema.ts";
import type { BirthdayUpdateModel } from "./model.ts";

export const updateBirthdayValidation: Schema<BirthdayUpdateModel> = {
    name: [
        { v: "str" },
        { v: "strMinLen", min: 1 },
        { v: "strMaxLen", max: 32 },
    ],
    day: [
        { v: "dt" },
        { v: "dtMin", min: "1970-01-01" },
    ],
};
