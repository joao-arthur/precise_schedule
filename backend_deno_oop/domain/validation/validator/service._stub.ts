import type { ValidatorService } from "./service.ts";

export class ValidatorStub implements ValidatorService {
    public validate(): void {}
}
