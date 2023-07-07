import { assertEquals } from "std/testing/asserts.ts";
import { UniqueInfoRepositoryMock } from "./UniqueInfoRepositoryMock.ts";

Deno.test("UniqueInfoRepositoryMock", async () => {
    assertEquals(
        await new UniqueInfoRepositoryMock(1, 2).countUsername(),
        1,
    );
    assertEquals(
        await new UniqueInfoRepositoryMock(1, 2).countEmail(),
        2,
    );
});
