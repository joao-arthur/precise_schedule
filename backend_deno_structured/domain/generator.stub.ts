import type { DateGenerator, IdGenerator } from "./generator.ts";

export function idGeneratorStubBuild(value: string): IdGenerator {
    return {
        gen: () => value,
    };
}

export function dateGeneratorStubBuild(value: Date): DateGenerator {
    return {
        gen: () => value,
    };
}
