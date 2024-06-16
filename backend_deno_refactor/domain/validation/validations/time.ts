export type TimeVal = { readonly type: "time" };

export class TimeValidationError extends Error {
    constructor() {
        super("must be a time in the format HH:mm");
    }
}

export function timeValidation(_: TimeVal, value: unknown): TimeValidationError | undefined {
    if (new Date(`1917-11-07T${value}:00.000Z`).toString() === "Invalid Date") {
        return new TimeValidationError();
    }
}
