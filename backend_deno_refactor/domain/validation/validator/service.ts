import type { Result } from "../../lang/result.ts";
import type { Schema } from "../schema.ts";
import type { ValidationError } from "../ValidationError.ts";

export type ValidatorService = {
    readonly validate: <Keys>(
        validated: Keys,
        schema: Schema<Keys>,
    ) => Result<void, ValidationError>;
};
