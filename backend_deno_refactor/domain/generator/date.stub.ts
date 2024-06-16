import type { DateGenerator } from "./date.ts";

export function dateGeneratorStubBuild(value: Date): DateGenerator {
    return {
        gen: () => value,
    };
}
