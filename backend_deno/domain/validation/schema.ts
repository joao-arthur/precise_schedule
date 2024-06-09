import type { Validation } from "./model.ts";

export type Schema<Keys> = {
    readonly [key in keyof Keys]: readonly Validation[];
};
