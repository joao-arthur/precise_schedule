import { assertEquals } from "std/testing/asserts.ts";
import { UserUniqueInfoRepositoryStub } from "./repository._stub.ts";

Deno.test("UserUniqueInfoRepositoryStub", async () => {
    assertEquals(
        await new UserUniqueInfoRepositoryStub(1, 2).countUsername(),
        1,
    );
    assertEquals(
        await new UserUniqueInfoRepositoryStub(1, 2).countEmail(),
        2,
    );
});
