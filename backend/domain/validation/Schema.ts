import type { V } from "./V.ts";

export type Schema<Keys> = {
    readonly [key in keyof Keys]: readonly V[];
};
