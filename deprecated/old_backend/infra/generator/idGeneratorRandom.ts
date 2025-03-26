import type { IdGenerator } from "../../domain/generator.ts";

const LENGTH = 64;
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function idGeneratorRandom(): IdGenerator {
    return {
        gen: () =>
            Array(LENGTH)
                .fill(undefined)
                .map(() => CHARS.charAt(Math.floor(Math.random() * LENGTH)))
                .join(""),
    };
}
