import type { DateGenerator } from "../../domain/generator.ts";

export function dateGeneratorNow(): DateGenerator {
    return {
        gen: () => new Date(),
    };
}
