import { ValidatorProvider } from "@ps/domain/validation/validator/provider.ts";

export class ValidatorProviderStub implements ValidatorProvider {
    constructor(private readonly error: Error | undefined) {}

    public execute(): Error | undefined {
        return this.error;
    }
}
