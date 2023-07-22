import { assertEquals } from "std/testing/asserts.ts";
import { createEventModelStub } from "../../create/model._stub.ts";
import { AppointmentCreateFactoryStub } from "./factory._stub.ts";

Deno.test("AppointmentCreateFactoryStub", () => {
    assertEquals(
        new AppointmentCreateFactoryStub(
            createEventModelStub,
        ).build(),
        createEventModelStub,
    );
});
