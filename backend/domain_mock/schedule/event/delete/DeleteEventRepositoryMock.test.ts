import { assertEquals } from "std/testing/asserts.ts";
import { DeleteEventRepositoryMock } from "./DeleteEventRepositoryMock.ts";

Deno.test("DeleteEventRepositoryMock", () => {
    assertEquals(new DeleteEventRepositoryMock().del(), undefined);
});
