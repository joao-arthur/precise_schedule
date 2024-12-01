import { assertEquals } from "@std/assert/assert-equals";
import { idGeneratorRandom } from "./idGeneratorRandom.ts";

Deno.test("idGeneratorRandom", () => {
    const idGenerator = idGeneratorRandom();
    assertEquals(
        new Set(
            Array(10)
                .fill(undefined)
                .map(idGenerator.gen),
        ).size,
        10,
    );
});
