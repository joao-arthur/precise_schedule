import { assertEquals } from "@std/assert/assert-equals";
import { userStub } from "../model._stub.ts";
import { userFindModelStub } from "./model._stub.ts";
import { UserFindFactoryStub } from "./factory._stub.ts";
import { UserFindRepositoryStub } from "./repository._stub.ts";
import { UserNotFound } from "./error.userNotFound.ts";
import { UserFindServiceImpl } from "./service.impl.ts";
import { buildErr, buildOk } from "../../../lang/result.ts";

Deno.test("UserFindServiceImpl.findById", async () => {
    assertEquals(
        await  new UserFindServiceImpl(
            new UserFindFactoryStub(userFindModelStub),
            new UserFindRepositoryStub(undefined),
        ).findById(userStub.id),
        buildErr(new UserNotFound()),
    );
    assertEquals(
        await new UserFindServiceImpl(
            new UserFindFactoryStub(userFindModelStub),
            new UserFindRepositoryStub(userStub),
        ).findById(userStub.id),
        buildOk(userStub),
    );
});

Deno.test("UserFindServiceImpl.findByIdMapped", async () => {
    assertEquals(
        await  new UserFindServiceImpl(
            new UserFindFactoryStub(userFindModelStub),
            new UserFindRepositoryStub(undefined),
        ).findByIdMapped(userStub.id),
        buildErr(new UserNotFound()),
    );
    assertEquals(
        await new UserFindServiceImpl(
            new UserFindFactoryStub(userFindModelStub),
            new UserFindRepositoryStub(userStub),
        ).findByIdMapped(userStub.id),
        buildOk(userFindModelStub),
    );
});

Deno.test("UserFindServiceImpl.findByCredentials", async () => {
    assertEquals(
        await new UserFindServiceImpl(
            new UserFindFactoryStub(userFindModelStub),
            new UserFindRepositoryStub(undefined),
        ).findByCredentials(userStub.username, userStub.password),
        buildErr(new UserNotFound()),
    );
    assertEquals(
        await new UserFindServiceImpl(
            new UserFindFactoryStub(userFindModelStub),
            new UserFindRepositoryStub(userStub),
        ).findByCredentials(userStub.username, userStub.password),
        buildOk(userStub),
    );
});
