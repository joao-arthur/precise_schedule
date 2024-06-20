import type { DateGenerator } from "../../domain/generator/date.ts";

export function dateGeneratorNow(): DateGenerator {
    return {
        gen: () => new Date(),
    };
}
