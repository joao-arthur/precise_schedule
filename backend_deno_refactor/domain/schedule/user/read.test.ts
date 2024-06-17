import { assertEquals } from "@std/assert/assert-equals";
import { userRepoEmptyStubBuild, userRepoStubBuild } from "./repo.stub.ts";
import { err, ok } from "../../lang/result.ts";
import { userInfoStub, userStub } from "./model.stub.ts";
import {
    userInfoBuild,
    userInfoReadById,
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
        await userReadById(userRepoStubBuild(userStub, 0, 0), "appointment-id"),
        ok(userStub),
    );
});

Deno.test("userReadByCredentials", async () => {
    assertEquals(
        await userReadByCredentials(userRepoEmptyStubBuild(), "username", "password"),
        err(new UserNotFound()),
    );
    assertEquals(
        await userReadByCredentials(userRepoStubBuild(userStub, 0, 0), "username", "password"),
        ok(userStub),
    );
});

Deno.test("userInfoReadById", async () => {
    assertEquals(
        await userInfoReadById(userRepoEmptyStubBuild(), "appointment-id"),
        err(new UserNotFound()),
    );
    assertEquals(
        await userInfoReadById(userRepoStubBuild(userStub, 0, 0), "appointment-id"),
        ok(userInfoStub),
    );
});
