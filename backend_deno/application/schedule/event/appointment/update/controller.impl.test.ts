import { assertEquals } from "std/assert/assert_equals.ts";
import { eventStub } from "@ps/domain/schedule/event/model._stub.ts";
import { AppointmentUpdateServiceStub } from "@ps/domain/schedule/event/appointment/update/service._stub.ts";
import { noContent } from "../../../../http/response/noContent/builder.ts";
import { httpRequestFullStub } from "../../../../http/request/model._stub.ts";
import { AppointmentUpdateControllerImpl } from "./controller.impl.ts";

Deno.test("AppointmentUpdateControllerImpl", async () => {
    assertEquals(
        await new AppointmentUpdateControllerImpl(
            new AppointmentUpdateServiceStub(eventStub),
        ).handle(eventStub.user, httpRequestFullStub),
        noContent(),
    );
});
