import { assertEquals } from "@std/assert/assert-equals";
import { EventDeleteControllerImpl } from "./controller.ts";
import { eventStub } from "../../../domain/schedule/event/model.stub.ts";
import { httpRequestParamsStub } from "../../../http/request/model.stub.ts";
import { noContent } from "../../../http/response/noContent/builder.ts";

Deno.test("EventDeleteControllerImpl", async () => {
    assertEquals(
        await new EventDeleteControllerImpl().handle(eventStub.user, httpRequestParamsStub),
        noContent(),
    );
});
