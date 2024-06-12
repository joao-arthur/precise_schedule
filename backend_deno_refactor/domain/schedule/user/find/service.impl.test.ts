import { assertEquals } from "@std/assert/assert-equals";
import { userStub } from "../model._stub.ts";
import { userFindModelStub } from "./model._stub.ts";
import { UserFindRepositoryStub } from "./repository._stub.ts";
import { UserNotFound } from "./error.userNotFound.ts";
import { UserFindServiceImpl } from "./service.impl.ts";
import { err, ok } from "../../../lang/result.ts";

Deno.test("UserFindServiceImpl.findById", async () => {
    assertEquals(
        await new UserFindServiceImpl(
            new UserFindRepositoryStub(undefined),
        ).findById(userStub.id),
        err(new UserNotFound()),
    );
    assertEquals(
        await new UserFindServiceImpl(
            new UserFindRepositoryStub(userStub),
        ).findById(userStub.id),
        ok(userStub),
    );
});

Deno.test("UserFindServiceImpl.findByIdMapped", async () => {
    assertEquals(
        await new UserFindServiceImpl(
            new UserFindRepositoryStub(undefined),
        ).findByIdMapped(userStub.id),
        err(new UserNotFound()),
    );
    assertEquals(
        await new UserFindServiceImpl(
            new UserFindRepositoryStub(userStub),
        ).findByIdMapped(userStub.id),
        ok(userFindModelStub),
    );
});

Deno.test("UserFindServiceImpl.findByCredentials", async () => {
    assertEquals(
        await new UserFindServiceImpl(
            new UserFindRepositoryStub(undefined),
        ).findByCredentials(userStub.username, userStub.password),
        err(new UserNotFound()),
    );
    assertEquals(
        await new UserFindServiceImpl(
            new UserFindRepositoryStub(userStub),
        ).findByCredentials(userStub.username, userStub.password),
        ok(userStub),
    );
});
