import { assertEquals } from "std/testing/asserts.ts";
import { eventStub } from "@ps/domain/schedule/event/model._stub.ts";
import { AppointmentCreateServiceStub } from "@ps/domain/schedule/event/appointment/create/service._stub.ts";
import { created } from "../../../http/response/created/builder.ts";
import { httpRequestBodyStub } from "../../../http/request/model._stub.ts";
import { AppointmentCreateControllerImpl } from "./controller.impl.ts";

Deno.test("AppointmentCreateControllerImpl", async () => {
    assertEquals(
        await new AppointmentCreateControllerImpl(
            new AppointmentCreateServiceStub(eventStub),
        ).handle(eventStub.user, httpRequestBodyStub),
        created(eventStub),
    );
});
