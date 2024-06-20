import { assertEquals } from "@std/assert/assert-equals";
import { idGeneratorStubBuild } from "../../domain/generator/id.stub.ts";
import { dateGeneratorStubBuild } from "../../domain/generator/date.stub.ts";
import { session } from "../../domain/session/service.stub.ts";
import { sessionStubBuild } from "../../domain/session/service.stub.ts";
import {
    userCreateStub,
    userInfoStub,
    userLoginStub,
    userUpdateStub,
} from "../../domain/schedule/user/model.stub.ts";
import {
    userRepoEmptyStubBuild,
    userRepoUserStubBuild,
} from "../../domain/schedule/user/repo.stub.ts";
import { noContent, ok } from "../http/response.ts";
import { requestBuild } from "../http/request.stub.ts";
import {
    userCreateController,
    userInfoReadByIdController,
    userLoginController,
    userUpdateController,
} from "./user.ts";

Deno.test("userCreateController", async () => {
    assertEquals(
        await userCreateController(
            userRepoEmptyStubBuild(),
            idGeneratorStubBuild("user-id"),
            dateGeneratorStubBuild(new Date("2023-03-02T19:16:12.327Z")),
            sessionStubBuild(session, "user-id"),
            requestBuild(userCreateStub, {}),
        ),
        ok(session),
    );
});

Deno.test("userUpdateController", async () => {
    assertEquals(
        await userUpdateController(
            userRepoUserStubBuild(),
            dateGeneratorStubBuild(new Date("2024-06-17T20:53:37.173Z")),
            "user-id",
            requestBuild(userUpdateStub, {}),
        ),
        noContent(),
    );
});

Deno.test("UserLoginController", async () => {
    assertEquals(
        await userLoginController(
            userRepoUserStubBuild(),
            sessionStubBuild(session, "user-id"),
            requestBuild(userLoginStub, {}),
        ),
        ok(session),
    );
});

Deno.test("userInfoReadByIdController", async () => {
    assertEquals(
        await userInfoReadByIdController(
            userRepoUserStubBuild(),
            "user-id",
        ),
        ok(userInfoStub),
    );
});
