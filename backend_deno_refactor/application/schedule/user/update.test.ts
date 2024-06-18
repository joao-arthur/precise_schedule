import { assertEquals } from "@std/assert/assert-equals";
import { userUpdateStub } from "../../../domain/schedule/user/model.stub.ts";
import { requestBuild } from "../../http/request.stub.ts";
import { noContent } from "../../http/response.ts";
import { userUpdateController } from "./update.ts";
import { userRepoUserStubBuild } from "../../../domain/schedule/user/repo.stub.ts";
import { dateGeneratorStubBuild } from "../../../domain/generator/date.stub.ts";

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
