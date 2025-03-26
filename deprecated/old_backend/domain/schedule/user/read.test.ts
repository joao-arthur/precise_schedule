import { assertEquals } from "@std/assert/assert-equals";
import { userRepoEmptyStubBuild, userRepoUserStubBuild } from "./repo.stub.ts";
import { err, ok } from "../../lang/result.ts";
import { userInfoStub, userStub } from "./model.stub.ts";
import {
    userInfoBuild,
    userInfoReadByIdService,
    UserNotFound,
    userReadByCredentials,
    userReadById,
} from "./read.ts";

Deno.test("userInfoBuild", () => {
    assertEquals(
        userInfoBuild(userStub),
        {
            firstName: userStub.firstName,
            birthdate: userStub.birthdate,
            email: userStub.email,
            username: userStub.username,
        },
    );
});

Deno.test("userReadById", async () => {
    assertEquals(
        await userReadById(userRepoEmptyStubBuild(), "appointment-id"),
        err(new UserNotFound()),
    );
    assertEquals(
        await userReadById(userRepoUserStubBuild(), "appointment-id"),
        ok(userStub),
    );
});

Deno.test("userReadByCredentials", async () => {
    assertEquals(
        await userReadByCredentials(userRepoEmptyStubBuild(), "username", "password"),
        err(new UserNotFound()),
    );
    assertEquals(
        await userReadByCredentials(userRepoUserStubBuild(), "username", "password"),
        ok(userStub),
    );
});

Deno.test("userInfoReadByIdService", async () => {
    assertEquals(
        await userInfoReadByIdService(userRepoEmptyStubBuild(), "appointment-id"),
        err(new UserNotFound()),
    );
    assertEquals(
        await userInfoReadByIdService(userRepoUserStubBuild(), "appointment-id"),
        ok(userInfoStub),
    );
});
