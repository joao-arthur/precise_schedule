import { assertEquals } from "@std/assert/assert-equals";
import { appointmentCreateModelStub } from "./model._stub.ts";
import { buildEventCreate } from "./factory.ts";

Deno.test("AppointmentCreateFactoryImpl", () => {
    assertEquals(
        buildEventCreate(appointmentCreateModelStub),
        {
            category: "APPOINTMENT",
            ...appointmentCreateModelStub,
        },
    );
});
