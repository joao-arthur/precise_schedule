import type { Validator } from "./service.ts";

export class ValidatorStub implements Validator {
    public validate(): void {}
}
