import { assertEquals } from "@std/assert/assert-equals";
import { createEventModelStub } from "../../create/model._stub.ts";
import { AppointmentCreateFactoryStub } from "./factory._stub.ts";

Deno.test("AppointmentCreateFactoryStub", () => {
    assertEquals(
        new AppointmentCreateFactoryStub(createEventModelStub).build(),
        createEventModelStub,
    );
});
