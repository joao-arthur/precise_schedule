import { assertEquals } from "@std/assert/assert-equals";
import { userStub } from "../model._stub.ts";
import { userFindModelStub } from "./model._stub.ts";
import { UserFindRepositoryStub } from "./repo._stub.ts";
import { UserNotFound } from "./error.userNotFound.ts";
import { userFindByCredentials, userFindById, userFindByIdMapped } from "./service.ts";
import { err, ok } from "../../../lang/result.ts";

Deno.test("userFindById", async () => {
    assertEquals(
        await userFindById(new UserFindRepositoryStub(undefined), userStub.id),
        err(new UserNotFound()),
    );
    assertEquals(
        await userFindById(new UserFindRepositoryStub(userStub), userStub.id),
        ok(userStub),
    );
});

Deno.test("userFindByIdMapped", async () => {
    assertEquals(
        await userFindByIdMapped(new UserFindRepositoryStub(undefined), userStub.id),
        err(new UserNotFound()),
    );
    assertEquals(
        await userFindByIdMapped(new UserFindRepositoryStub(userStub), userStub.id),
        ok(userFindModelStub),
    );
});

Deno.test("userFindByCredentials", async () => {
    assertEquals(
        await userFindByCredentials(
            new UserFindRepositoryStub(undefined),
            userStub.username,
            userStub.password,
        ),
        err(new UserNotFound()),
    );
    assertEquals(
        await userFindByCredentials(
            new UserFindRepositoryStub(userStub),
            userStub.username,
            userStub.password,
        ),
        ok(userStub),
    );
});
