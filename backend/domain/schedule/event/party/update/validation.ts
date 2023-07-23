import type { Schema } from "../../../../validation/Schema.ts";
import type { PartyUpdateModel } from "./model.ts";

export const updatePartyValidation: Schema<PartyUpdateModel> = {
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
};
