import { BoolError } from "./BoolError.ts";

export function bool(value: unknown): BoolError | undefined {
    if (typeof value !== "boolean") {
        return new BoolError();
    }
}
