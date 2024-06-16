export type EmailVal = { readonly type: "email" };

export class EmailValidationError extends Error {
    constructor() {
        super("must be a email");
    }
}

export function emailValidation(_: EmailVal, value: unknown): EmailValidationError | undefined {
    if (typeof value !== "string") {
        return new EmailValidationError();
    }
    if (
        value.length < 5 || (!value.includes("@")) ||
        (!value.slice(value.indexOf("@")).includes("."))
    ) {
        return new EmailValidationError();
    }
}
