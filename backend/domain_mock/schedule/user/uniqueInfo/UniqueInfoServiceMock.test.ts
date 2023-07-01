import { assertEquals } from "std/testing/asserts.ts";
import { UniqueInfoServiceMock } from "./UniqueInfoServiceMock.ts";

Deno.test("UniqueInfoServiceMock", () => {
    assertEquals(
        new UniqueInfoServiceMock().validateNew(),
        undefined,
    );
    assertEquals(
        new UniqueInfoServiceMock().validateExisting(),
        undefined,
    );
});
