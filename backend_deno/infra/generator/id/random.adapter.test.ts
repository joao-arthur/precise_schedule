import { assertEquals } from "@std/assert/assert-equals";
import { IdGeneratorRandom } from "./random.adapter.ts";

Deno.test("IdGeneratorRandom", () => {
    const idGenerator = new IdGeneratorRandom();
    assertEquals(
        new Set(
            Array(10)
                .fill(undefined)
                .map(idGenerator.generate),
        ).size,
        10,
    );
});
