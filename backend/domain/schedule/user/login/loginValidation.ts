import type { Schema } from "@ps/domain/validation/Schema.ts";
import type { LoginModel } from "./LoginModel.ts";

import { V } from "@ps/domain/validation/V.ts";

export const loginValidation: Schema<LoginModel> = {
    username: [V.required, V.isString],
    password: [V.required, V.isString],
};
