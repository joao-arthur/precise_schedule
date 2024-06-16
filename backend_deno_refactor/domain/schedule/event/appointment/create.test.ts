import type { AppointmentCreateModel } from "./create.ts";
import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { eventStub } from "../model.stub.ts";
import { appointmentCreate, appointmentCreateToEventCreate } from "./create.ts";

const appointmentCreateModelStub: AppointmentCreateModel = {
    name: "name",
    day: "2023-06-24",
    begin: "08:00",
    end: "18:00",
    frequency: undefined,
    weekendRepeat: false,
};

Deno.test("appointmentCreateToEventCreate", () => {
    assertEquals(
        appointmentCreateToEventCreate(appointmentCreateModelStub),
        {
            category: "APPOINTMENT",
            ...appointmentCreateModelStub,
        },
    );
});

Deno.test("appointmentCreate", async () => {
    assertEquals(
        await appointmentCreate(
            eventStub.user,
            appointmentCreateModelStub,
        ),
        ok(eventStub),
    );
});
