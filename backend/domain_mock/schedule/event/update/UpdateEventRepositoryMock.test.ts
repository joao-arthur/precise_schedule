import { assertEquals } from "std/testing/asserts.ts";
import { UpdateEventRepositoryMock } from "./UpdateEventRepositoryMock.ts";

Deno.test("UpdateEventRepositoryMock", () => {
    assertEquals(
        new UpdateEventRepositoryMock().update(),
        undefined,
    );
});
