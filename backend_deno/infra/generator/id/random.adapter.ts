import type { IdGenerator } from "@ps/domain/generator/id/service.ts";

export class IdGeneratorRandom implements IdGenerator {
    private static LENGTH = 64;
    private static CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    public generate(): string {
        return Array(IdGeneratorRandom.LENGTH)
            .fill(undefined)
            .map(() =>
                IdGeneratorRandom.CHARS.charAt(
                    Math.floor(
                        Math.random() * IdGeneratorRandom.LENGTH,
                    ),
                )
            )
            .join("");
    }
}
