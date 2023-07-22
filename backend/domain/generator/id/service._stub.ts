import type { IdGenerator } from "./service.ts";

export class IdGeneratorStub implements IdGenerator {
    constructor(private readonly value: string) {}

    public generate(): string {
        return this.value;
    }
}
