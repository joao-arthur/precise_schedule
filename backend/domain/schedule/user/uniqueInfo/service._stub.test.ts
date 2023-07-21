import { assertEquals } from "std/testing/asserts.ts";
import { UniqueInfoServiceMock } from "./UniqueInfoServiceMock.ts";

Deno.test("UniqueInfoServiceMock", async () => {
    assertEquals(
        await new UniqueInfoServiceMock().validateNew(),
        undefined,
    );
    assertEquals(
        await new UniqueInfoServiceMock().validateExisting(),
        undefined,
    );
});
