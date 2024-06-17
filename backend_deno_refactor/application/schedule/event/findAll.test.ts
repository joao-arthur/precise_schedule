import { assertEquals } from "@std/assert/assert-equals";
import { FindAllEventControllerImpl } from "./controller.impl.ts";
import { eventFindModelStub } from "@ps/domain/schedule/event/find/model._stub.ts";
import { EventFindServiceStub } from "@ps/domain/schedule/event/find/service._stub.ts";
import { eventStub } from "@ps/domain/schedule/event/model._stub.ts";
import { ok } from "../../../http/response/ok/builder.ts";

Deno.test("FindAllEventControllerImpl", async () => {
    assertEquals(
        await new FindAllEventControllerImpl(
            new EventFindServiceStub(eventStub, eventFindModelStub),
        ).handle(eventStub.user),
        ok([eventFindModelStub]),
    );
});
