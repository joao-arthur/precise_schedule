export type DtMinVal = { readonly type: "dtMin"; readonly min: string };

export class DtMinValidationError extends Error {
    constructor(min: string) {
        super(`must be greater than ${min}`);
    }
}

export function dtMinValidation(val: DtMinVal, value: unknown): DtMinValidationError | undefined {
    if (
        new Date(`${value}T00:00:00.000Z`).toString() === "Invalid Date" ||
        new Date(`${val.min}T00:00:00.000Z`) > new Date(`${value}T00:00:00.000Z`)
    ) {
        return new DtMinValidationError(val.min);
    }
}
