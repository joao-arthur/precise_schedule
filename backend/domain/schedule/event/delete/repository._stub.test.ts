import { assertEquals } from "std/testing/asserts.ts";
import { DeleteEventRepositoryMock } from "./DeleteEventRepositoryMock.ts";

Deno.test("DeleteEventRepositoryMock", async () => {
    assertEquals(
        await new DeleteEventRepositoryMock().del(),
        undefined,
    );
});
