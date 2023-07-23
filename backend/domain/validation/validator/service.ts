import type { Schema } from "../schema.ts";

export type ValidatorService = {
    readonly validate: <Keys>(validated: Keys, schema: Schema<Keys>) => void;
};
