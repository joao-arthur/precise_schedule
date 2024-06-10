import { assertEquals } from "@std/assert/assert-equals";
import { UserUpdateRepositoryStub } from "./repository._stub.ts";
import { buildOk } from "../../../lang/result.ts";

Deno.test("UserUpdateRepositoryStub", async () => {
    assertEquals(
        await new UserUpdateRepositoryStub().update(),
        buildOk(undefined),
    );
});
