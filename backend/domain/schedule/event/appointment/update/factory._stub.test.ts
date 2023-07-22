import { assertEquals } from "std/testing/asserts.ts";
import { eventUpdateModelStub } from "../../update/model._stub.ts";
import { AppointmentUpdateFactoryStub } from "./factory._stub.ts";

Deno.test("AppointmentUpdateFactoryStub", () => {
    assertEquals(
        new AppointmentUpdateFactoryStub(
            eventUpdateModelStub,
        ).build(),
        eventUpdateModelStub,
    );
});
