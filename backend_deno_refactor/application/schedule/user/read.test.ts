import { assertEquals } from "@std/assert/assert-equals";
import { userStub } from "../../../domain/schedule/user/model.stub.ts";
import { userFindModelStub } from "../../../domain/schedule/user/find/model.stub.ts";
import { ok } from "../../../http/response.ts";
import { UserFindControllerImpl } from "./controller.ts";

Deno.test("UserFindControllerImpl", async () => {
    assertEquals(
        await new UserFindControllerImpl().handle(userStub.id),
        ok(userFindModelStub),
    );
});
