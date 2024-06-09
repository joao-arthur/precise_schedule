import { assertEquals } from "std/assert/assert_equals.ts";
import { eventStub } from "@ps/domain/schedule/event/model._stub.ts";
import { DateCreateServiceStub } from "@ps/domain/schedule/event/date/create/service._stub.ts";
import { created } from "../../../../http/response/created/builder.ts";
import { httpRequestBodyStub } from "../../../../http/request/model._stub.ts";
import { DateCreateControllerImpl } from "./controller.impl.ts";

Deno.test("DateCreateControllerImpl", async () => {
    assertEquals(
        await new DateCreateControllerImpl(
            new DateCreateServiceStub(eventStub),
        ).handle(eventStub.user, httpRequestBodyStub),
        created(eventStub),
    );
});
