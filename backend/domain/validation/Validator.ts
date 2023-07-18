import type { Schema } from "./Schema.ts";

export type Validator = {
    readonly validate: <Keys>(validated: Keys, schema: Schema<Keys>) => void;
};
