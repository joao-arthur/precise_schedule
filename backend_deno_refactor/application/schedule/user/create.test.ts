import { assertEquals } from "@std/assert/assert-equals";
import { sessionStub } from "../../../domain/session/model.stub.ts";
import { ok } from "../../http/response.ts";
import { userCreateStub } from "../../../domain/schedule/user/model.stub.ts";
import { userRepoEmptyStubBuild } from "../../../domain/schedule/user/repo.stub.ts";
import { idGeneratorStubBuild } from "../../../domain/generator/id.stub.ts";
import { dateGeneratorStubBuild } from "../../../domain/generator/date.stub.ts";
import { sessionCreateStubBuild } from "../../../domain/session/create.stub.ts";
import { requestBuild } from "../../http/request.stub.ts";
import { userCreateController } from "./create.ts";

Deno.test("userCreateController", async () => {
    assertEquals(
        await userCreateController(
            userRepoEmptyStubBuild(),
            idGeneratorStubBuild("user-id"),
            dateGeneratorStubBuild(new Date("2023-03-02T19:16:12.327Z")),
            sessionCreateStubBuild(sessionStub),
            requestBuild(userCreateStub, {}),
        ),
        ok(sessionStub),
    );
});
