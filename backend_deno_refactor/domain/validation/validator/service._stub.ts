import type { Result } from "../../lang/result.ts";
import type { ValidatorService } from "./service.ts";
import { ok } from "../../lang/result.ts";
import { ValidationError } from "../ValidationError.ts";

export class ValidatorStub implements ValidatorService {
    public validate(): Result<void, ValidationError> {
        return ok(undefined);
    }
}