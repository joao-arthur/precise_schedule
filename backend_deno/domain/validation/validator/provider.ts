import { Validation } from "../model.ts";

export type ValidatorProvider = {
    readonly execute: <Keys>(
        validation: Validation,
        validated: Keys | null | undefined,
        key: keyof Keys,
    ) => Error | undefined;
};
