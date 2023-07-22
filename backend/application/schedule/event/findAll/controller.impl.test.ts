import { assertEquals } from "std/testing/asserts.ts";
import { FindAllEventControllerImpl } from "./controller.impl.ts";
import { EventFindServiceStub } from "@ps/domain/schedule/event/find/service._stub.ts";
import { eventStub } from "@ps/domain/schedule/event/model._stub.ts";
import { ok } from "../../../http/response/ok/builder.ts";

Deno.test("FindAllEventControllerImpl", async () => {
    assertEquals(
        await new FindAllEventControllerImpl(
            new EventFindServiceStub(eventStub),
        ).handle(eventStub.user),
        ok([eventStub]),
    );
});
