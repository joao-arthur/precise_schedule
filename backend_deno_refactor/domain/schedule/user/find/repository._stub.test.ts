import { assertEquals } from "@std/assert/assert-equals";
import { buildOk } from "../../../lang/result.ts";
import { userStub } from "../model._stub.ts";
import { UserFindRepositoryStub } from "./repository._stub.ts";

Deno.test("UserFindRepositoryStub", async () => {
    assertEquals(
        await new UserFindRepositoryStub(undefined).findById(),
        buildOk(undefined),
    );
    assertEquals(
        await new UserFindRepositoryStub(undefined)
            .findByCredentials(),
        buildOk(undefined),
    );
    assertEquals(
        await new UserFindRepositoryStub(userStub).findById(),
        buildOk(userStub),
    );
    assertEquals(
        await new UserFindRepositoryStub(userStub)
            .findByCredentials(),
        buildOk(userStub),
    );
});
