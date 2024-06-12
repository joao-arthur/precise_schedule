import { assertEquals } from "@std/assert/assert-equals";
import { appointmentUpdateModelStub } from "./model._stub.ts";
import { buildEventUpdate } from "./factory.ts";

Deno.test("AppointmentUpdateFactoryImpl", () => {
    assertEquals(
        buildEventUpdate(appointmentUpdateModelStub),
        {
            category: "APPOINTMENT",
            ...appointmentUpdateModelStub,
        },
    );
});
