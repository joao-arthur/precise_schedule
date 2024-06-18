import { assertEquals } from "@std/assert/assert-equals";
import { userInfoStub } from "../../../domain/schedule/user/model.stub.ts";
import { ok } from "../../http/response.ts";
import { userInfoReadByIdController } from "./read.ts";
import { userRepoUserStubBuild } from "../../../domain/schedule/user/repo.stub.ts";

Deno.test("userInfoReadByIdController", async () => {
    assertEquals(
        await userInfoReadByIdController(
            userRepoUserStubBuild(),
            "user-id",
        ),
        ok(userInfoStub),
    );
});
