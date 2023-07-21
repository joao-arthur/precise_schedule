import type { Schema } from "@ps/domain/validation/Schema.ts";
import type { CreatePartyEvent } from "./CreatePartyEvent.ts";

export const createPartyValidation: Schema<CreatePartyEvent> = {
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
