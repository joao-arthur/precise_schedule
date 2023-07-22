import { assertEquals } from "std/testing/asserts.ts";
import { UserUpdateRepositoryStub } from "./repository._stub.ts";

Deno.test("UserUpdateRepositoryStub", async () => {
    assertEquals(
        await new UserUpdateRepositoryStub().update(),
        undefined,
    );
});
