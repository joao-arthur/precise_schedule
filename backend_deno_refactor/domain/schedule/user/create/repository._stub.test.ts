import { assertEquals } from "@std/assert/assert-equals";
import { UserCreateRepositoryStub } from "./repo._stub.ts";
import { ok } from "../../../lang/result.ts";

Deno.test("UserCreateRepositoryStub", async () => {
    assertEquals(
        await new UserCreateRepositoryStub().create(),
        ok(undefined),
    );
});
