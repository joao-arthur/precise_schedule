import type { IdGenerator } from "./id.ts";

export function idGeneratorStubBuild(value: string): IdGenerator {
    return {
        generate: () => value,
    };
}
