import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../lang/result.ts";
import { userRepoUserStubBuild } from "./repo.stub.ts";
import { userStub, userUpdatedStub, userUpdateStub } from "./model.stub.ts";
import { userUpdate, userUpdateToUser } from "./update.ts";
import { dateGeneratorStubBuild } from "../../generator/date.stub.ts";

Deno.test("userUpdateToUser", () => {
    assertEquals(
        userUpdateToUser(userUpdateStub, userStub, new Date("2024-06-17T20:53:37.173Z")),
        userUpdatedStub,
    );
});

Deno.test("userUpdate", async () => {
    assertEquals(
        await userUpdate(
            userRepoUserStubBuild(),
            dateGeneratorStubBuild(new Date("2024-06-17T20:53:37.173Z")),
            "user-id",
            userUpdateStub,
        ),
        ok(userUpdatedStub),
    );
});
