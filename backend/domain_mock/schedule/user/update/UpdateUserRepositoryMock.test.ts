import { assertEquals } from "std/testing/asserts.ts";
import { UpdateUserRepositoryMock } from "./UpdateUserRepositoryMock.ts";

Deno.test("UpdateUserRepositoryMock", async () => {
    assertEquals(
        await new UpdateUserRepositoryMock().update(),
        undefined,
    );
});
