import { assertEquals } from "@std/assert/assert-equals";
import { userStub } from "@ps/domain/schedule/user/model._stub.ts";
import { userFindModelStub } from "@ps/domain/schedule/user/find/model._stub.ts";
import { UserFindServiceStub } from "@ps/domain/schedule/user/find/service._stub.ts";
import { ok } from "../../../http/response/ok/builder.ts";
import { UserFindControllerImpl } from "./controller.impl.ts";

Deno.test("UserFindControllerImpl", async () => {
    assertEquals(
        await new UserFindControllerImpl(
            new UserFindServiceStub(userStub, userFindModelStub),
        ).handle(userStub.id),
        ok(userFindModelStub),
    );
});
