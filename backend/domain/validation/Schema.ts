import type { Validation } from "./Validation.ts";

export type Schema<Keys> = {
    readonly [key in keyof Keys]: readonly Validation[];
};
