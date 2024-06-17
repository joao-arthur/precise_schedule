import { assertEquals } from "@std/assert/assert-equals";
import { FindAllEventControllerImpl } from "./controller.ts";
import { eventFindModelStub } from "../../../domain/schedule/event/find/model.stub.ts";
import { eventStub } from "../../../domain/schedule/event/model.stub.ts";
import { ok } from "../../../http/response.ts";

Deno.test("FindAllEventControllerImpl", async () => {
    assertEquals(
        await new FindAllEventControllerImpl().handle(eventStub.user),
        ok([eventFindModelStub]),
    );
});
