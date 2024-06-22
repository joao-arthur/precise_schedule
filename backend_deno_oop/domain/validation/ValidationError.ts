import { ValidationResult } from "./ValidationResult.ts";

export class ValidationError extends Error {
    constructor(public readonly result: ValidationResult) {
        super();
    }
}
