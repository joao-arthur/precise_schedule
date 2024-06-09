import { assertEquals } from "std/assert/assert_equals.ts";
import { createEventModelStub } from "../../create/model._stub.ts";
import { AppointmentCreateFactoryStub } from "./factory._stub.ts";

Deno.test("AppointmentCreateFactoryStub", () => {
    assertEquals(
        new AppointmentCreateFactoryStub(createEventModelStub).build(),
        createEventModelStub,
    );
});
