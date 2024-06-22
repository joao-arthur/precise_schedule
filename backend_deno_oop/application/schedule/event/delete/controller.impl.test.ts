import { assertEquals } from "@std/assert/assert-equals";
import { EventDeleteControllerImpl } from "./controller.impl.ts";
import { EventDeleteServiceStub } from "@ps/domain/schedule/event/delete/service._stub.ts";
import { eventStub } from "@ps/domain/schedule/event/model._stub.ts";
import { httpRequestParamsStub } from "../../../http/request/model._stub.ts";
import { noContent } from "../../../http/response/noContent/builder.ts";

Deno.test("EventDeleteControllerImpl", async () => {
    assertEquals(
        await new EventDeleteControllerImpl(
            new EventDeleteServiceStub(),
        ).handle(eventStub.user, httpRequestParamsStub),
        noContent(),
    );
});
