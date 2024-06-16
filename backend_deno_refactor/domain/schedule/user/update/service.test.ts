import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { userStub } from "../model.stub.ts";
import { userUpdateModelStub } from "./model.stub.ts";
import { UserUpdateRepositoryStub } from "./repo.stub.ts";
import { userUpdate } from "./service.ts";

Deno.test("userUpdate", async () => {
    assertEquals(
        await new userUpdate(
            new UserUpdateRepositoryStub(),
            userStub.id,
            userUpdateModelStub,
        ),
        ok(userStub),
    );
});
