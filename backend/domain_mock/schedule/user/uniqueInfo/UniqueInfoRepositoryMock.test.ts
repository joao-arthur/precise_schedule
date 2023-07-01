import { assertEquals } from "std/testing/asserts.ts";
import { UniqueInfoRepositoryMock } from "./UniqueInfoRepositoryMock.ts";

Deno.test("UniqueInfoRepositoryMock", () => {
    assertEquals(
        new UniqueInfoRepositoryMock(1, 2).countUsername(),
        1,
    );
    assertEquals(new UniqueInfoRepositoryMock(1, 2).countEmail(), 2);
});
