import type { Schema } from "../../../../validation/schema.ts";
import type { BirthdayUpdateModel } from "./model.ts";

export const updateBirthdaySchema: Schema<BirthdayUpdateModel> = {
    name: [
        { type: "str" },
        { type: "strMinLen", min: 1 },
        { type: "strMaxLen", max: 32 },
    ],
    day: [
        { type: "dt" },
        { type: "dtMin", min: "1970-01-01" },
    ],
};
