import type { Schema } from "../../../validation/Schema.ts";
import type { UserLoginModel } from "./model.ts";

export const userLoginValidation: Schema<UserLoginModel> = {
    username: [
        { v: "str" },
        { v: "strMinLen", min: 1 },
        { v: "strMaxLen", max: 32 },
    ],
    password: [
        { v: "str" },
        { v: "strMinLen", min: 8 },
        { v: "strMaxLen", max: 32 },
        { v: "strMinNum", min: 1 },
        { v: "strMinUpper", min: 1 },
        { v: "strMinLower", min: 1 },
        { v: "strMinSpecial", min: 1 },
    ],
};
