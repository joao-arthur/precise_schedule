import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../lang/result.ts";
import { idGeneratorStubBuild } from "../../generator/id.stub.ts";
import { dateGeneratorStubBuild } from "../../generator/date.stub.ts";
import { session } from "../../session/service.stub.ts";
import { userRepoEmptyStubBuild } from "./repo.stub.ts";
import { userCreateStub, userStub } from "./model.stub.ts";
import { userCreateService, userCreateToUser } from "./create.ts";
import { sessionStubBuild } from "../../session/service.stub.ts";

Deno.test("userCreateToUser", () => {
    assertEquals(
        userCreateToUser(userCreateStub, "user-id", new Date("2023-03-02T19:16:12.327Z")),
        userStub,
    );
});

Deno.test("userCreateService", async () => {
    assertEquals(
        await userCreateService(
            userRepoEmptyStubBuild(),
            idGeneratorStubBuild("user-id"),
            dateGeneratorStubBuild(new Date("2023-03-02T19:16:12.327Z")),
            sessionStubBuild(session, "user-id"),
            userCreateStub,
        ),
        ok(session),
    );
});
