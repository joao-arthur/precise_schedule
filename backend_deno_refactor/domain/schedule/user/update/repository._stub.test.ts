import { assertEquals } from "@std/assert/assert-equals";
import { UserUpdateRepositoryStub } from "./repo.stub.ts";
import { ok } from "../../../lang/result.ts";

Deno.test("UserUpdateRepositoryStub", async () => {
    assertEquals(
        await new UserUpdateRepositoryStub().update(),
        ok(undefined),
    );
});
