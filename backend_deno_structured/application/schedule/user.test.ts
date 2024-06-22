import { assertEquals } from "@std/assert/assert-equals";
import { idGeneratorStubBuild } from "../../domain/generator.stub.ts";
import { dateGeneratorStubBuild } from "../../domain/generator.stub.ts";
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
    userCreateEndpoint,
    userInfoReadByIdEndpoint,
    userLoginEndpoint,
    userUpdateEndpoint,
} from "./user.ts";

Deno.test("userCreateEndpoint", async () => {
    assertEquals(
        await userCreateEndpoint(
            userRepoEmptyStubBuild(),
            idGeneratorStubBuild("user-id"),
            dateGeneratorStubBuild(new Date("2023-03-02T19:16:12.327Z")),
            sessionStubBuild(session, "user-id"),
            requestBuild(userCreateStub, {}),
        ),
        ok(session),
    );
});

Deno.test("userUpdateEndpoint", async () => {
    assertEquals(
        await userUpdateEndpoint(
            userRepoUserStubBuild(),
            dateGeneratorStubBuild(new Date("2024-06-17T20:53:37.173Z")),
            "user-id",
            requestBuild(userUpdateStub, {}),
        ),
        noContent(),
    );
});

Deno.test("UserLoginEndpoint", async () => {
    assertEquals(
        await userLoginEndpoint(
            userRepoUserStubBuild(),
            sessionStubBuild(session, "user-id"),
            requestBuild(userLoginStub, {}),
        ),
        ok(session),
    );
});

Deno.test("userInfoReadByIdEndpoint", async () => {
    assertEquals(
        await userInfoReadByIdEndpoint(
            userRepoUserStubBuild(),
            "user-id",
        ),
        ok(userInfoStub),
    );
});
