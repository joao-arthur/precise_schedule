export type DtVal = { readonly type: "dt" };

export class DtValidationError extends Error {
    constructor() {
        super("must be a date in the format YYYY-MM-DD");
    }
}

export function dtValidation(_: DtVal, value: unknown): DtValidationError | undefined {
    if (new Date(`${value}T00:00:00.000Z`).toString() === "Invalid Date") {
        return new DtValidationError();
    }
}
