import { DtError } from "./DtError.ts";

export function dt(value: unknown): DtError | undefined {
    if (!(value instanceof Date)) {
        return new DtError();
    }
}
