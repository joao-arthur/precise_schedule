import type { Schema } from "../Schema.ts";

export type ValidatorService = {
    readonly validate: <Keys>(validated: Keys, schema: Schema<Keys>) => void;
};
