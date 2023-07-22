import { assertEquals } from "std/testing/asserts.ts";
import { appointmentCreateModelStub } from "./model._stub.ts";
import { AppointmentCreateFactoryImpl } from "./factory.impl.ts";

Deno.test("AppointmentCreateFactoryImpl", () => {
    assertEquals(
        new AppointmentCreateFactoryImpl().build(
            appointmentCreateModelStub,
        ),
        {
            category: "APPOINTMENT",
            ...appointmentCreateModelStub,
        },
    );
});
