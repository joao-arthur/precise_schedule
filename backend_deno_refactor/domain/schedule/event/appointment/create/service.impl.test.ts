import { assertEquals } from "@std/assert/assert-equals";
import { ValidatorStub } from "../../../../validation/validator/service._stub.ts";
import { ok } from "../../../../lang/result.ts";
import { eventStub } from "../../model._stub.ts";
import { EventCreateServiceStub } from "../../create/service._stub.ts";
import { appointmentCreateModelStub } from "./model._stub.ts";
import { AppointmentCreateServiceImpl } from "./service.impl.ts";

Deno.test("AppointmentCreateServiceImpl", async () => {
    assertEquals(
        await new AppointmentCreateServiceImpl(
            new ValidatorStub(),
            new EventCreateServiceStub(eventStub),
        ).create(eventStub.user, appointmentCreateModelStub),
        ok(eventStub),
    );
});
