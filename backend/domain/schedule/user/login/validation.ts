import type { Schema } from "@ps/domain/validation/Schema.ts";
import type { LoginModel } from "./LoginModel.ts";

export const loginValidation: Schema<LoginModel> = {
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
