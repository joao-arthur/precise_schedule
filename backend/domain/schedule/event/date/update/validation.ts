import type { Schema } from "../../../../validation/Schema.ts";
import type { DateUpdateModel } from "./model.ts";

export const updateDateValidation: Schema<DateUpdateModel> = {
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
};
