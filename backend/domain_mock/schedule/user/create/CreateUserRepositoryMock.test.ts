import { assertEquals } from "std/testing/asserts.ts";
import { CreateUserRepositoryMock } from "./CreateUserRepositoryMock.ts";

Deno.test("CreateUserRepositoryMock", () => {
    assertEquals(new CreateUserRepositoryMock().create(), undefined);
});
