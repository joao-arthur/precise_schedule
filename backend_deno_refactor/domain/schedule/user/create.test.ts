import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../lang/result.ts";
import { idGeneratorStubBuild } from "../../generator/id.stub.ts";
import { dateGeneratorStubBuild } from "../../generator/date.stub.ts";
import { sessionStub } from "../../session/model.stub.ts";
import { userRepoEmptyStubBuild } from "./repo.stub.ts";
import { userCreateStub, userStub } from "./model.stub.ts";
import { userCreate, userCreateToUser } from "./create.ts";
import { sessionCreateStubBuild } from "../../session/create.stub.ts";

Deno.test("userCreateToUser", () => {
    assertEquals(
        userCreateToUser(userCreateStub, "user-id", new Date("2023-03-02T19:16:12.327Z")),
        userStub,
    );
});

Deno.test("userCreate", async () => {
    assertEquals(
        await userCreate(
            userRepoEmptyStubBuild(),
            idGeneratorStubBuild("user-id"),
            dateGeneratorStubBuild(new Date("2023-03-02T19:16:12.327Z")),
            sessionCreateStubBuild(sessionStub),
            userCreateStub,
        ),
        ok(sessionStub),
    );
});
