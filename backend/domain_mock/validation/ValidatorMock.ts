import type { Validator } from "@ps/domain/validation/Validator.ts";

export class ValidatorMock implements Validator {
    public validate(): void {}
}
