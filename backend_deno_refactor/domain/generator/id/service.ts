export type IdGenerator = {
    readonly generate: () => string;
};

export class IdGeneratorStub implements IdGenerator {
    constructor(private readonly value: string) {}

    public generate(): string {
        return this.value;
    }
}
