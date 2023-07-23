import type { Schema } from "../../../validation/schema.ts";
import type { UserUpdateModel } from "./model.ts";

export const userUpdateValidation: Schema<UserUpdateModel> = {
    firstName: [
        { type: "str" },
        { type: "strMinLen", min: 1 },
        { type: "strMaxLen", max: 256 },
    ],
    birthdate: [
        { type: "dt" },
        { type: "dtMin", min: "1970-01-01" },
    ],
    email: [
        { type: "email" },
        { type: "strMaxLen", max: 256 },
    ],
    username: [
        { type: "str" },
        { type: "strMinLen", min: 1 },
        { type: "strMaxLen", max: 32 },
    ],
    password: [
        { type: "str" },
        { type: "strMinLen", min: 8 },
        { type: "strMaxLen", max: 32 },
        { type: "strMinNum", min: 1 },
        { type: "strMinUpper", min: 1 },
        { type: "strMinLower", min: 1 },
        { type: "strMinSpecial", min: 1 },
    ],
};
