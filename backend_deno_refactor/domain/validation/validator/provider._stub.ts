import type { ValidatorProvider } from "./provider.ts";

export class ValidatorProviderStub implements ValidatorProvider {
    constructor(private readonly error: Error | undefined) {}

    public execute(): Error | undefined {
        return this.error;
    }
}
