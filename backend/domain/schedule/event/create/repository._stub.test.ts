import { assertEquals } from "std/testing/asserts.ts";
import { CreateEventRepositoryMock } from "./CreateEventRepositoryMock.ts";

Deno.test("CreateEventRepositoryMock", async () => {
    assertEquals(
        await new CreateEventRepositoryMock().create(),
        undefined,
    );
});
