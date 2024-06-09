import { assertEquals } from "std/assert/assert_equals.ts";
import { UserUpdateRepositoryStub } from "./repository._stub.ts";

Deno.test("UserUpdateRepositoryStub", async () => {
    assertEquals(
        await new UserUpdateRepositoryStub().update(),
        undefined,
    );
});
