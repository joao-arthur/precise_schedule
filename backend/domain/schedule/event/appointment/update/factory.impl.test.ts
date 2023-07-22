import { assertEquals } from "std/testing/asserts.ts";
import { appointmentUpdateModelStub } from "./model._stub.ts";
import { AppointmentUpdateFactoryImpl } from "./factory.impl.ts";

Deno.test("AppointmentUpdateFactoryImpl", () => {
    assertEquals(
        new AppointmentUpdateFactoryImpl().build(appointmentUpdateModelStub),
        {
            category: "APPOINTMENT",
            ...appointmentUpdateModelStub,
        },
    );
});
