import { StrError } from "./StrError.ts";

export function str(value: unknown): StrError | undefined {
    if (typeof value !== "string") {
        return new StrError();
    }
}
