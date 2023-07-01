import { assertEquals } from "std/testing/asserts.ts";
import { IdGeneratorRandom } from "./IdGeneratorRandom.ts";

Deno.test("IdGeneratorRandom", () => {
    const idGenerator = new IdGeneratorRandom();
    assertEquals(
        new Set(
            Array(10).fill(undefined).map(
                idGenerator.generate,
            ),
        ).size,
        10,
    );
});
