import { assertEquals } from "std/testing/asserts.ts";
import { UpdateEventRepositoryMock } from "./UpdateEventRepositoryMock.ts";

Deno.test("UpdateEventRepositoryMock", async () => {
    assertEquals(
        await new UpdateEventRepositoryMock().update(),
        undefined,
    );
});
