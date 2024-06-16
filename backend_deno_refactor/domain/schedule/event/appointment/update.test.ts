import type { AppointmentUpdate } from "./update.ts";
import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { eventStub } from "../model.stub.ts";
import { appointmentUpdate, appointmentUpdateToEventUpdate } from "./update.ts";

const appointmentUpdateModelStub: AppointmentUpdate = {
    name: "name",
    day: "2025-06-24",
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
            eventStub.user,
            eventStub.id,
            appointmentUpdateModelStub,
        ),
        ok(eventStub),
    );
});
