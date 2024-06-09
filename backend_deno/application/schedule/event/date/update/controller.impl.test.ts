import { assertEquals } from "std/assert/assert_equals.ts";
import { eventStub } from "@ps/domain/schedule/event/model._stub.ts";
import { DateUpdateServiceStub } from "@ps/domain/schedule/event/date/update/service._stub.ts";
import { noContent } from "../../../../http/response/noContent/builder.ts";
import { httpRequestFullStub } from "../../../../http/request/model._stub.ts";
import { DateUpdateControllerImpl } from "./controller.impl.ts";

Deno.test("DateUpdateControllerImpl", async () => {
    assertEquals(
        await new DateUpdateControllerImpl(
            new DateUpdateServiceStub(eventStub),
        ).handle(eventStub.user, httpRequestFullStub),
        noContent(),
    );
});
