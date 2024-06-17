import { assertEquals } from "@std/assert/assert-equals";
import { EventFindControllerImpl } from "./controller.ts";
import { eventFindModelStub } from "../../../domain/schedule/event/find/model.stub.ts";
import { eventStub } from "../../../domain/schedule/event/model.stub.ts";
import { httpRequestParamsStub } from "../../../http/request/model.stub.ts";
import { ok } from "../../../http/response.ts";

Deno.test("EventFindControllerImpl", async () => {
    assertEquals(
        await new EventFindControllerImpl(
            eventStub,
            eventFindModelStub,
        ).handle(eventStub.user, httpRequestParamsStub),
        ok(eventFindModelStub),
    );
});
