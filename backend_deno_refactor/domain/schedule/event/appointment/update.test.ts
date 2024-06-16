import type { AppointmentUpdateModel } from "./update.ts";
import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { ValidatorStub } from "../../../validation/validator/service._stub.ts";
import { eventStub } from "../model._stub.ts";
import { appointmentUpdate, appointmentUpdateToEventUpdate } from "./update.ts";

const appointmentUpdateModelStub: AppointmentUpdateModel = {
    name: "name",
    day: "2023-06-24",
    begin: "08:00",
    end: "18:00",
    frequency: undefined,
    weekendRepeat: false,
};

Deno.test("appointmentUpdateToEventUpdate", () => {
    assertEquals(
        appointmentUpdateToEventUpdate(appointmentUpdateModelStub),
        {
            category: "APPOINTMENT",
            ...appointmentUpdateModelStub,
        },
    );
});

Deno.test("appointmentUpdate", async () => {
    assertEquals(
        await appointmentUpdate(
            new ValidatorStub(),
            eventStub.user,
            eventStub.id,
            appointmentUpdateModelStub,
        ),
        ok(eventStub),
    );
});
