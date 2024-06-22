import { assertEquals } from "@std/assert/assert-equals";
import { userStub } from "../model._stub.ts";
import { UserFindRepositoryStub } from "./repository._stub.ts";

Deno.test("UserFindRepositoryStub", async () => {
    assertEquals(
        await new UserFindRepositoryStub(undefined).findById(),
        undefined,
    );
    assertEquals(
        await new UserFindRepositoryStub(undefined)
            .findByCredentials(),
        undefined,
    );
    assertEquals(
        await new UserFindRepositoryStub(userStub).findById(),
        userStub,
    );
    assertEquals(
        await new UserFindRepositoryStub(userStub)
            .findByCredentials(),
        userStub,
    );
});
