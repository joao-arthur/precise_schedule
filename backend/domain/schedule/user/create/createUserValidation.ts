import type { Schema } from "@ps/domain/validation/Schema.ts";
import type { CreateUserModel } from "./CreateUserModel.ts";

import { V } from "@ps/domain/validation/V.ts";

export const createUserValidation: Schema<CreateUserModel> = {
    email: [V.required, V.isString],
    username: [V.required, V.isString],
    password: [V.required, V.isString],
};
