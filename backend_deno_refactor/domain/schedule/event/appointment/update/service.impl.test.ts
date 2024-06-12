import { assertEquals } from "@std/assert/assert-equals";
import { ValidatorStub } from "../../../../validation/validator/service._stub.ts";
import { ok } from "../../../../lang/result.ts";
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
        ok(eventStub),
    );
});
