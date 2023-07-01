import type { IdGenerator } from "@ps/domain/generation/IdGenerator.ts";

export class IdGeneratorMock implements IdGenerator {
    constructor(private readonly value: string) {}

    public generate(): string {
        return this.value;
    }
}
