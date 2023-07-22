import { assertEquals } from "std/testing/asserts.ts";
import { ValidatorStub } from "../../../../validation/service._stub.ts";
import { eventStub } from "../../model._stub.ts";
import { EventUpdateServiceStub } from "../../update/service._stub.ts";
import { appointmentUpdateModelStub } from "./model._stub.ts";
import { AppointmentUpdateFactoryStub } from "./factory._stub.ts";
import { AppointmentUpdateServiceImpl } from "./service.impl.ts";

Deno.test("AppointmentUpdateServiceImpl", async () => {
    assertEquals(
        await new AppointmentUpdateServiceImpl(
            new ValidatorStub(),
            new AppointmentUpdateFactoryStub(eventStub),
            new EventUpdateServiceStub(eventStub),
        ).update(eventStub.user, eventStub.id, appointmentUpdateModelStub),
        eventStub,
    );
});
