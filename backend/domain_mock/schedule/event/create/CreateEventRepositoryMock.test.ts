import { assertEquals } from "std/testing/asserts.ts";
import { CreateEventRepositoryMock } from "./CreateEventRepositoryMock.ts";

Deno.test("CreateEventRepositoryMock", () => {
    assertEquals(new CreateEventRepositoryMock().create(), undefined);
});
