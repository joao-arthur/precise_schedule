import { Validation } from "../model.ts";

export type ValidatorProvider = {
    readonly execute: (validation: Validation, value: unknown) => Error | undefined;
};
