import type { CompareBiggerVal } from "@ps/domain/validation/model.ts";
import { CompareBiggerValidationError } from "./error.ts";

export function compareBiggerValidation(
    val: CompareBiggerVal,
    valueA: unknown,
    valueB: unknown,
): CompareBiggerValidationError | undefined {
    if (!valueA) return new CompareBiggerValidationError(val.field);
    if (!valueB) return new CompareBiggerValidationError(val.field);
    if (valueB >= valueA) {
        return new CompareBiggerValidationError(val.field);
    }
}
