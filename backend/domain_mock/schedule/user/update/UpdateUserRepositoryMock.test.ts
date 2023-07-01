import { assertEquals } from "std/testing/asserts.ts";
import { UpdateUserRepositoryMock } from "./UpdateUserRepositoryMock.ts";

Deno.test("UpdateUserRepositoryMock", () => {
    assertEquals(
        new UpdateUserRepositoryMock().update(),
        undefined,
    );
});
