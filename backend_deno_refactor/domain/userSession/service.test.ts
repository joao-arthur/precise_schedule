import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../lang/result.ts";
import { userFindModelStub } from "../schedule/user/find/model.stub.ts";
import { userStub } from "../schedule/user/model.stub.ts";
import { DecodeSessionServiceStub } from "../session/decode/service.stub.ts";
import { sessionStub } from "../session/model.stub.ts";
import { ValidateUserSessionServiceImpl } from "./service.ts";

Deno.test("ValidateUserSessionServiceImpl", async () => {
    assertEquals(
        await new ValidateUserSessionServiceImpl(
            new UserFindServiceStub(userStub, userFindModelStub),
            new DecodeSessionServiceStub(userStub.id),
        ).validate(sessionStub),
        ok(undefined),
    );
});
