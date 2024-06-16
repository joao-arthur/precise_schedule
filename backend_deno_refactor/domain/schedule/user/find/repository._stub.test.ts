import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { userStub } from "../model.stub.ts";
import { UserFindRepositoryStub } from "./repo.stub.ts";

Deno.test("UserFindRepositoryStub", async () => {
    assertEquals(
        await new UserFindRepositoryStub(undefined).findById(),
        ok(undefined),
    );
    assertEquals(
        await new UserFindRepositoryStub(undefined)
            .findByCredentials(),
        ok(undefined),
    );
    assertEquals(
        await new UserFindRepositoryStub(userStub).findById(),
        ok(userStub),
    );
    assertEquals(
        await new UserFindRepositoryStub(userStub)
            .findByCredentials(),
        ok(userStub),
    );
});
