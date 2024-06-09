import { assertEquals } from "std/testing/asserts.ts";
import { UserCreateRepositoryStub } from "./repository._stub.ts";

Deno.test("UserCreateRepositoryStub", async () => {
    assertEquals(
        await new UserCreateRepositoryStub().create(),
        undefined,
    );
});
