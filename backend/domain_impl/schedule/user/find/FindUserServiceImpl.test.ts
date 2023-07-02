import { assertEquals, assertRejects } from "std/testing/asserts.ts";
import { userMock } from "@ps/domain_mock/schedule/user/UserMock.ts";
import { FindUserRepositoryMock } from "@ps/domain_mock/schedule/user/find/FindUserRepositoryMock.ts";
import { UserNotFound } from "@ps/domain/schedule/user/find/UserNotFound.ts";
import { FindUserServiceImpl } from "./FindUserServiceImpl.ts";

Deno.test("FindUserServiceImpl", async () => {
    await assertRejects(
        () =>
            new FindUserServiceImpl(
                new FindUserRepositoryMock(undefined),
            ).findById(userMock.id),
        UserNotFound,
    );
    assertEquals(
        await new FindUserServiceImpl(
            new FindUserRepositoryMock(userMock),
        ).findById(userMock.id),
        userMock,
    );
});
