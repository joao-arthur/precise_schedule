import { assertEquals } from "std/assert/assert_equals.ts";
import { UserCreateRepositoryStub } from "./repository._stub.ts";

Deno.test("UserCreateRepositoryStub", async () => {
    assertEquals(
        await new UserCreateRepositoryStub().create(),
        undefined,
    );
});
