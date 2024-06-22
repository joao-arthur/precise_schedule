import { assertEquals } from "@std/assert/assert-equals";
import { UserCreateRepositoryStub } from "./repository._stub.ts";

Deno.test("UserCreateRepositoryStub", async () => {
    assertEquals(
        await new UserCreateRepositoryStub().create(),
        undefined,
    );
});
