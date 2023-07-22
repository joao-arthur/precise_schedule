import { assertEquals, assertRejects } from "std/testing/asserts.ts";
import { userStub } from "../model._stub.ts";
import { userFindModelStub } from "./model._stub.ts";
import { UserFindFactoryStub } from "./factory._stub.ts";
import { UserFindRepositoryStub } from "./repository._stub.ts";
import { UserNotFound } from "./UserNotFound.ts";
import { UserFindServiceImpl } from "./service.impl.ts";

Deno.test("UserFindServiceImpl.findById", async () => {
    await assertRejects(
        () =>
            new UserFindServiceImpl(
                new UserFindFactoryStub(userFindModelStub),
                new UserFindRepositoryStub(undefined),
            ).findById(userStub.id),
        UserNotFound,
    );
    assertEquals(
        await new UserFindServiceImpl(
            new UserFindFactoryStub(userFindModelStub),
            new UserFindRepositoryStub(userStub),
        ).findById(userStub.id),
        userStub,
    );
});

Deno.test("UserFindServiceImpl.findByIdMapped", async () => {
    await assertRejects(
        () =>
            new UserFindServiceImpl(
                new UserFindFactoryStub(userFindModelStub),
                new UserFindRepositoryStub(undefined),
            ).findByIdMapped(userStub.id),
        UserNotFound,
    );
    assertEquals(
        await new UserFindServiceImpl(
            new UserFindFactoryStub(userFindModelStub),
            new UserFindRepositoryStub(userStub),
        ).findByIdMapped(userStub.id),
        userFindModelStub,
    );
});

Deno.test("UserFindServiceImpl.findByCredentials", async () => {
    await assertRejects(
        () =>
            new UserFindServiceImpl(
                new UserFindFactoryStub(userFindModelStub),
                new UserFindRepositoryStub(undefined),
            ).findByCredentials(userStub.username, userStub.password),
        UserNotFound,
    );
    assertEquals(
        await new UserFindServiceImpl(
            new UserFindFactoryStub(userFindModelStub),
            new UserFindRepositoryStub(userStub),
        ).findByCredentials(userStub.username, userStub.password),
        userStub,
    );
});
