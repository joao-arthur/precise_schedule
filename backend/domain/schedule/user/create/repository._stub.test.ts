import { assertEquals } from "std/testing/asserts.ts";
import { CreateUserRepositoryMock } from "./CreateUserRepositoryMock.ts";

Deno.test("CreateUserRepositoryMock", async () => {
    assertEquals(
        await new CreateUserRepositoryMock().create(),
        undefined,
    );
});
