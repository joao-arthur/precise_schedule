import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../lang/result.ts";
import { userFindModelStub } from "../schedule/user/find/model._stub.ts";
import { UserFindServiceStub } from "../schedule/user/find/service._stub.ts";
import { userStub } from "../schedule/user/model._stub.ts";
import { DecodeSessionServiceStub } from "../session/decode/service._stub.ts";
import { sessionStub } from "../session/model._stub.ts";
import { ValidateUserSessionServiceImpl } from "./service.impl.ts";

Deno.test("ValidateUserSessionServiceImpl", async () => {
    assertEquals(
        await new ValidateUserSessionServiceImpl(
            new UserFindServiceStub(userStub, userFindModelStub),
            new DecodeSessionServiceStub(userStub.id),
        ).validate(sessionStub),
        ok(undefined),
    );
});